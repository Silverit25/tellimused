import Database from 'better-sqlite3';

const db = new Database(':memory:'); // In-memory database for development

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    address TEXT NOT NULL,
    deadline TEXT NOT NULL,
    priority TEXT CHECK(priority IN ('low', 'medium', 'high')) NOT NULL,
    notes TEXT,
    status TEXT CHECK(status IN ('pending', 'completed')) NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )
`);

export const insertTask = (task: any) => {
  const stmt = db.prepare(`
    INSERT INTO tasks (id, title, client, address, deadline, priority, notes, status, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    task.id,
    task.title,
    task.client,
    task.address,
    task.deadline,
    task.priority,
    task.notes,
    task.status,
    task.createdAt,
    task.updatedAt
  );
};

export const getTasksByDate = (date: string) => {
  const stmt = db.prepare(`
    SELECT * FROM tasks 
    WHERE date(deadline) = date(?)
    ORDER BY 
      CASE priority
        WHEN 'high' THEN 1
        WHEN 'medium' THEN 2
        WHEN 'low' THEN 3
      END,
      deadline ASC
  `);
  
  return stmt.all(date);
};

export const updateTaskStatus = (taskId: string, status: 'pending' | 'completed') => {
  const stmt = db.prepare(`
    UPDATE tasks 
    SET status = ?, updatedAt = ?
    WHERE id = ?
  `);
  
  stmt.run(status, new Date().toISOString(), taskId);
};

export const deleteTask = (taskId: string) => {
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  stmt.run(taskId);
};