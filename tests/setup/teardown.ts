import sqlite3 from "sqlite3";

const dbPath: string = "flashcards-api/src/db/flashcards.testing.db";

const clearDatabase = (): void => {
  const db: sqlite3.Database = new sqlite3.Database(
    dbPath,
    (err: Error | null) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log("Connected to the SQLite database.");
      }
    }
  );

  db.serialize(() => {
    db.run("DELETE FROM flashcards", (err: Error | null) => {
      if (err) {
        console.error("Error deleting records:", err.message);
      } else {
        console.log("All records deleted successfully.");
      }
    });
  });

  db.close((err: Error | null) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
};

clearDatabase();
