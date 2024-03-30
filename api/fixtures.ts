import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import PhotoGallery from "./models/PhotoGallery";

const dropCollection = async (db: mongoose.Connection, collectionName: string) =>{
  try {
    await db.dropCollection(collectionName);
  }catch (e){
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'photoGallery'];

  for (const collectionName of collections){
    await dropCollection(db, collectionName);
  }
  const [user1, user2] = await User.create(
    {
      email: "admin@gmail.com",
      password: "admin",
      displayName: "admin",
      role: "admin",
      token: "admin",
    },
    {
      email: "user@gmail.com",
      password: "user",
      displayName: "user",
      role: "user",
      token: "user",
    }
  );

  await PhotoGallery.create(
    {
      author: user1,
      title: "Природа",
      image: "fixtures/photo1.jpg",
    },
    {
      author: user1,
      title: "Природа",
      image: "fixtures/photo2.jpg",
    },
    {
      author: user2,
      title: "Закат",
      image: "fixtures/photo3.jpg",
    },
    {
      author: user2,
      title: "Закат",
      image: "fixtures/photo4.jpeg",
    },
    {
      author: user2,
      title: "Закат",
      image: "fixtures/photo5.jpeg",
    },
    {
      author: user2,
      title: "Закат",
      image: "fixtures/photo6.jpg",
    },
  );
  await db.close();
};

run().catch(console.error);