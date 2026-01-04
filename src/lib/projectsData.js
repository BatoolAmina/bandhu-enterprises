import clientPromise from "./mongodb";

export async function getProjects() {
  const client = await clientPromise;
  const db = client.db("bandhu_db");
  
  const projects = await db.collection("projects")
    .find({})
    .sort({ _id: -1 })
    .toArray();
    
  return JSON.parse(JSON.stringify(projects));
}