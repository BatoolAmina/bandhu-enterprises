"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, X, Image as ImageIcon, MapPin, 
  LogOut, Package, Database, Save, AlertCircle, 
  Loader2, Search, Edit3, Archive, ArchiveRestore, Eye, Lock, Filter,
  PieChart, BarChart3, CheckCircle2, Briefcase, FileText, ListPlus
} from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stats, setStats] = useState({ years: "", projects: "" });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  
  const categories = ["All", "Civil Infrastructure", "Interior Solutions", "Turnkey Projects", "Structural Protection", "Other"];
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [newProject, setNewProject] = useState({ title: "", category: "Civil Infrastructure", location: "", image: "", description: "", isArchived: false });
  const [newService, setNewService] = useState({ title: "", category: "Planning & Design", iconName: "PencilRuler", items: [], isArchived: false });

  const analyticsData = useMemo(() => {
    const counts = {};
    const allUniqueCategories = [...new Set(projects.map(p => p.category))];
    allUniqueCategories.forEach(cat => {
      if (cat) counts[cat] = projects.filter(p => p.category === cat).length;
    });
    return { counts, total: projects.length, archived: projects.filter(p => p.isArchived).length, totalServices: services.length };
  }, [projects, services]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      localStorage.removeItem('lastAdminActivity');
      setIsLoggedIn(false);
      window.location.href = "/"; 
    } catch (err) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const INACTIVITY_LIMIT = 30 * 60 * 1000; 
    const checkInactivity = () => {
      const lastActivity = localStorage.getItem('lastAdminActivity');
      if (lastActivity && Date.now() - parseInt(lastActivity) > INACTIVITY_LIMIT) {
        handleLogout();
      }
    };
    const updateActivity = () => {
      localStorage.setItem('lastAdminActivity', Date.now().toString());
    };
    const interval = setInterval(checkInactivity, 60000);
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
    };
  }, [isLoggedIn, handleLogout]);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch('/api/founder-stats');
        if (res.ok) {
          const statData = await res.json();
          setStats(statData);
          const [projRes, servRes] = await Promise.all([fetch('/api/projects'), fetch('/api/services?all=true')]);
          if (projRes.ok) setProjects(await projRes.json());
          if (servRes.ok) setServices(await servRes.json());
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('lastAdminActivity');
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setLoginError("");
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      if (res.ok) {
        localStorage.setItem('lastAdminActivity', Date.now().toString());
        window.location.reload();
      } else {
        setLoginError("Invalid credentials. Access Denied.");
      }
    } catch (err) {
      setLoginError("Connection Error");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (activeTab === 'projects') {
      return projects.filter(p => {
        const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
    }
    return services.filter(s => s.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeTab, projects, services, searchQuery, selectedCategory]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const handleEditClick = (item, type) => {
    setEditingId(item._id);
    if (type === 'projects') setNewProject({ ...item });
    else setNewService({ ...item });
    setShowForm(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setNewProject(prev => ({ ...prev, image: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => { setNewProject(prev => ({ ...prev, image: "" })); };

  const handleSave = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const isProject = activeTab === 'projects';
    const data = isProject ? newProject : newService;
    let imageUrl = isProject ? data.image : null;
    if (isProject && imageUrl && imageUrl.startsWith('data:image')) {
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: JSON.stringify({ image: imageUrl }) });
      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }
    const endpoint = isProject ? 'projects' : 'services';
    const url = editingId ? `/api/${endpoint}/update` : `/api/${endpoint}/add`;
    const payload = editingId ? { id: editingId, ...data } : { ...data };
    if(isProject) payload.image = imageUrl;
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      showToast("Saved successfully");
      setShowForm(false);
      setEditingId(null);
      setNewProject({ title: "", category: "Civil Infrastructure", location: "", image: "", description: "", isArchived: false });
      setNewService({ title: "", category: "Planning & Design", iconName: "PencilRuler", items: [], isArchived: false });
      window.location.reload();
    } else { showToast("Error saving", "error"); }
    setActionLoading(false);
  };

  const handleToggleArchive = async (id, status, type) => {
    const res = await fetch(`/api/${type}/archive`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isArchived: !status }),
    });
    if (res.ok) { showToast(`Status updated!`); window.location.reload(); }
  };

  const handleDelete = async (id, type) => {
    if (!confirm("Delete permanently?")) return;
    const res = await fetch(`/api/${type}/delete?id=${id}`, { method: 'DELETE' });
    if (res.ok) { showToast("Deleted successfully!"); window.location.reload(); }
  };

  const handleUpdateStats = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const res = await fetch('/api/founder-stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(stats) });
    if (res.ok) { showToast("Counters updated!"); }
    setActionLoading(false);
  };

  if (loading) return (
    <div className="fixed inset-0 z-[9999] bg-[#1C1612] flex flex-col items-center justify-center gap-4 text-[#D4AF37]">
      <Loader2 className="animate-spin" size={40} />
      <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Verifying Security Clearance</p>
    </div>
  );

  if (!isLoggedIn) return (
    <div className="fixed inset-0 z-[9999] bg-[#1C1612] flex items-center justify-center p-6 text-black overflow-hidden">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-4">
                <Lock size={30} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-center uppercase tracking-tighter">Secure Login</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 text-center">Identity Verification Required</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input required type="email" placeholder="Admin Email" className="w-full p-5 bg-gray-50 border rounded-2xl outline-none focus:border-[#D4AF37] transition-all" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
          <input required type="password" placeholder="Access Key" className="w-full p-5 bg-gray-50 border rounded-2xl outline-none focus:border-[#D4AF37] transition-all" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
          {loginError && (
            <div className="flex items-center gap-2 justify-center text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                <AlertCircle size={14} />
                <span className="text-[10px] font-bold uppercase">{loginError}</span>
            </div>
          )}
          <button disabled={actionLoading} className="w-full bg-[#1C1612] text-[#D4AF37] p-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-xl flex justify-center">
            {actionLoading ? <Loader2 className="animate-spin" /> : "Verify and Enter"}
          </button>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9998] flex bg-[#FDFCF0] font-sans text-black overflow-hidden">
      <AnimatePresence>
        {toast.show && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="fixed top-0 left-1/2 -translate-x-1/2 z-[10001] pointer-events-none">
            <div className={`px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border ${toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-green-100 text-green-600'}`}>
              <CheckCircle2 size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="w-72 bg-[#1C1612] text-white p-8 flex flex-col sticky top-0 h-screen border-r border-[#D4AF37]/10 shadow-2xl flex-shrink-0">
        <div className="mb-12"><h2 className="text-[#D4AF37] font-serif text-2xl font-bold uppercase tracking-tighter">Bandhu Portal</h2></div>
        <nav className="flex-1 space-y-3">
          <button onClick={() => setActiveTab('projects')} className={`flex items-center gap-4 w-full p-4 rounded-2xl ${activeTab === 'projects' ? 'bg-[#D4AF37] text-white shadow-md' : 'text-gray-400 hover:text-white transition-colors'}`}><Package size={20} /> <span className="font-bold text-[10px] uppercase tracking-widest">Portfolio</span></button>
          <button onClick={() => setActiveTab('services')} className={`flex items-center gap-4 w-full p-4 rounded-2xl ${activeTab === 'services' ? 'bg-[#D4AF37] text-white shadow-md' : 'text-gray-400 hover:text-white transition-colors'}`}><Briefcase size={20} /> <span className="font-bold text-[10px] uppercase tracking-widest">Services</span></button>
          <button onClick={() => setActiveTab('analytics')} className={`flex items-center gap-4 w-full p-4 rounded-2xl ${activeTab === 'analytics' ? 'bg-[#D4AF37] text-white shadow-md' : 'text-gray-400 hover:text-white transition-colors'}`}><PieChart size={20} /> <span className="font-bold text-[10px] uppercase tracking-widest">Analytics</span></button>
          <button onClick={() => setActiveTab('stats')} className={`flex items-center gap-4 w-full p-4 rounded-2xl ${activeTab === 'stats' ? 'bg-[#D4AF37] text-white shadow-md' : 'text-gray-400 hover:text-white transition-colors'}`}><Database size={20} /> <span className="font-bold text-[10px] uppercase tracking-widest">Counters</span></button>
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-4 p-4 text-red-400 border border-red-500/10 rounded-2xl hover:bg-red-500/10 transition-all"><LogOut size={18} /> <span className="font-bold text-[10px] uppercase tracking-widest">Exit Portal</span></button>
      </aside>

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto h-screen bg-[#FDFCF0] relative">
        <header className="mb-10 relative overflow-hidden rounded-[3rem] h-64 shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')` }} />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between gap-8 px-10">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#AA8B2E] p-[2px] shadow-2xl">
                  <div className="w-full h-full rounded-3xl bg-[#1C1612] flex items-center justify-center"><ImageIcon size={36} className="text-[#D4AF37]" /></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-[#1C1612] rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2"><h1 className="text-4xl font-serif text-white uppercase tracking-tight font-bold">Admin Portal</h1><span className="bg-[#D4AF37] text-[#1C1612] text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Authorized</span></div>
                <p className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.3em]">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex gap-4 text-white">
              <div className="bg-white/10 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-white/20 flex flex-col items-center min-w-[140px]"><span className="text-3xl font-serif font-bold leading-none">{analyticsData.total}</span><span className="text-gray-400 text-[8px] font-bold uppercase mt-2">Projects</span></div>
              <div className="bg-white/10 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-white/20 flex flex-col items-center min-w-[140px]"><span className="text-3xl font-serif font-bold text-[#D4AF37] leading-none">{analyticsData.totalServices}</span><span className="text-gray-400 text-[8px] font-bold uppercase mt-2">Services</span></div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {(activeTab === 'projects' || activeTab === 'services') && (
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder={`Search ${activeTab}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-white border border-[#E5E1C9] rounded-2xl outline-none shadow-sm" />
                </div>
                <button onClick={() => {setEditingId(null); setShowForm(true);}} className="bg-[#2D241E] text-white px-10 py-4 rounded-full flex items-center gap-3 font-bold text-[10px] uppercase shadow-xl hover:bg-[#D4AF37] transition-all"><Plus size={16} /> New Entry</button>
              </div>
              <div className="bg-white rounded-[3rem] border border-[#E5E1C9] p-10 shadow-sm space-y-4">
                {filteredItems.map((item) => (
                  <div key={item._id} className={`flex items-center justify-between p-6 border rounded-[2rem] ${item.isArchived ? 'bg-gray-50 opacity-60' : 'bg-white border-[#E5E1C9]/50 hover:bg-[#FDFCF0]'}`}>
                    <div className="flex items-center gap-6">
                      {activeTab === 'projects' ? (
                        /* FIX: Check for item.image existence before rendering <img> */
                        item.image ? <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt={item.title} /> : <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300"><ImageIcon size={20} /></div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-[#D4AF37]"><Briefcase size={24} /></div>
                      )}
                      <div>
                        <h3 className="font-bold text-[#2D241E] uppercase text-sm">{item.title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{activeTab === 'projects' ? item.location : item.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(item, activeTab)} className="p-3 text-gray-300 hover:text-blue-500 transition-colors"><Edit3 size={18} /></button>
                      <button onClick={() => handleToggleArchive(item._id, item.isArchived, activeTab)} className="p-3 text-gray-300 hover:text-[#D4AF37] transition-colors">{item.isArchived ? <ArchiveRestore size={18} /> : <Archive size={18} />}</button>
                      <button onClick={() => handleDelete(item._id, activeTab)} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-[#E5E1C9] shadow-sm space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-black"><BarChart3 className="text-[#D4AF37]" size={16} /> Category Distribution</h2>
                {Object.entries(analyticsData.counts).map(([cat, count]) => (
                  <div key={cat} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-black"><span>{cat}</span><span>{count}</span></div>
                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${(count / (analyticsData.total || 1)) * 100}%` }} className="h-full bg-[#1C1612]" /></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md space-y-6 bg-white p-10 rounded-[3rem] border border-[#E5E1C9]">
              <form onSubmit={handleUpdateStats} className="space-y-4">
                <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Experience Years</label><input value={stats.years} className="w-full p-4 bg-[#FDFCF0] border border-[#E5E1C9] rounded-2xl text-black outline-none focus:border-[#D4AF37]" onChange={(e) => setStats({...stats, years: e.target.value})} /></div>
                <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Project Count</label><input value={stats.projects} className="w-full p-4 bg-[#FDFCF0] border border-[#E5E1C9] rounded-2xl text-black outline-none focus:border-[#D4AF37]" onChange={(e) => setStats({...stats, projects: e.target.value})} /></div>
                <button type="submit" disabled={actionLoading} className="w-full bg-[#1C1612] text-[#D4AF37] p-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-lg">Apply Changes</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[20000] flex items-center justify-center p-6 text-black overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-5xl rounded-[3rem] p-10 shadow-2xl relative grid grid-cols-1 md:grid-cols-2 gap-12 max-h-[90vh] overflow-y-auto">
              <button onClick={() => {setShowForm(false); setEditingId(null);}} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
              <div>
                <h2 className="text-2xl font-serif text-[#1C1612] uppercase mb-8 font-bold tracking-tighter">{editingId ? 'Edit' : 'New'} Entry</h2>
                <form onSubmit={handleSave} className="space-y-4">
                  {activeTab === 'projects' ? (
                    <>
                      <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-[#D4AF37] tracking-[0.2em]">Upload Image</label><div className="relative group"><input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="file-input" /><label htmlFor="file-input" className="w-full p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#D4AF37]"><ImageIcon size={24} className="text-gray-300" /><span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{newProject.image ? "Image Selected" : "Click to Upload"}</span></label>{newProject.image && <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg"><X size={14} /></button>}</div></div>
                      <input required className="w-full p-4 bg-gray-50 border rounded-2xl focus:border-[#D4AF37] transition-all" placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} />
                      <input required className="w-full p-4 bg-gray-50 border rounded-2xl focus:border-[#D4AF37] transition-all" placeholder="Location" value={newProject.location} onChange={(e) => setNewProject({...newProject, location: e.target.value})} />
                      <textarea className="w-full p-4 bg-gray-50 border rounded-2xl h-32 focus:border-[#D4AF37] outline-none resize-none transition-all" placeholder="Project Description" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} />
                      
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase text-[#D4AF37] ml-2">Project Category</label>
                        <select className="w-full p-4 bg-gray-50 border rounded-2xl outline-none cursor-pointer" value={categories.includes(newProject.category) ? newProject.category : "Other"} onChange={(e) => setNewProject({...newProject, category: e.target.value})}>
                          {categories.map(c => c !== "All" && <option key={c} value={c}>{c}</option>)}
                        </select>
                        
                        {(!categories.includes(newProject.category) || newProject.category === "Other") && (
                          <motion.input 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            required 
                            className="w-full p-4 mt-2 bg-[#FAF9E6] border border-[#D4AF37]/30 rounded-2xl focus:border-[#D4AF37] outline-none transition-all" 
                            placeholder="Specify Other Category" 
                            value={newProject.category === "Other" ? "" : newProject.category} 
                            onChange={(e) => setNewProject({...newProject, category: e.target.value})} 
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-[9px] font-bold uppercase text-[#D4AF37] ml-2">Category</label><input required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" placeholder="Planning & Design" value={newService.category} onChange={(e) => setNewService({...newService, category: e.target.value})} /></div><div className="space-y-2"><label className="text-[9px] font-bold uppercase text-[#D4AF37] ml-2">Icon Name</label><input required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" placeholder="PencilRuler" value={newService.iconName} onChange={(e) => setNewService({...newService, iconName: e.target.value})} /></div></div>
                      <input required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#D4AF37] transition-all" placeholder="Service Title" value={newService.title} onChange={(e) => setNewService({...newService, title: e.target.value})} />
                      <div className="space-y-2"><label className="text-[9px] font-bold uppercase text-[#D4AF37] ml-2 flex items-center gap-2"><ListPlus size={12}/> Bullets (Comma Separated)</label><input required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#D4AF37] transition-all" placeholder="Bullet 1, Bullet 2" value={newService.items.join(", ")} onChange={(e) => setNewService({...newService, items: e.target.value.split(",").map(i => i.trim())})} /></div>
                    </>
                  )}
                  <button type="submit" disabled={actionLoading} className="w-full bg-[#1C1612] text-[#D4AF37] p-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-xl flex justify-center">
                    {actionLoading ? <Loader2 className="animate-spin" /> : "Save Changes"}
                  </button>
                </form>
              </div>
              
              <div className="bg-gray-50 rounded-[2.5rem] p-8 flex flex-col justify-center items-center border border-dashed border-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2"><Eye size={14}/> Live Preview</p>
                <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 hover:scale-105">
                  <div className="h-44 bg-gray-100 relative flex items-center justify-center overflow-hidden">
                    {activeTab === 'projects' ? (
                      /* FIX: Only render img if newProject.image is not empty */
                      newProject.image ? (
                        <img src={newProject.image} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <ImageIcon size={48} className="text-gray-300" />
                      )
                    ) : (
                      <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37]"><Briefcase size={32} /></div>
                    )}
                    <div className="absolute top-4 right-0"><span className="bg-[#FAF9E6] px-4 py-1 rounded-l-full text-[8px] font-bold uppercase tracking-widest text-[#D4AF37] border border-[#E5E1C9] shadow-sm">{activeTab === 'projects' ? newProject.category : newService.category}</span></div>
                  </div>
                  <div className="p-8 text-center bg-white">
                    <h4 className="font-serif font-bold text-xl uppercase mb-6 text-[#1C1612] tracking-widest leading-tight border-b pb-4">{activeTab === 'projects' ? (newProject.title || "Untitled Project") : (newService.title || "Architectural Design")}</h4>
                    {activeTab === 'projects' ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2 text-[10px] text-[#D4AF37] font-bold tracking-widest"><MapPin size={12} /> {newProject.location || "Location TBD"}</div>
                        <p className="text-[11px] text-gray-500 italic line-clamp-3">{newProject.description || "Project summary preview..."}</p>
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {(newService.items.length > 0 ? newService.items : ["2D/3D Concept Maps", "Regulatory Compliance"]).map((item, idx) => (
                          <li key={idx} className="flex items-center justify-center gap-3 text-[11px] text-gray-600 font-bold uppercase transition-all hover:translate-x-1">
                            <CheckCircle2 size={14} className="text-[#D4AF37]" /> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}