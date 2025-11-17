import {
  users,
  posts,
  promotions,
  type User,
  type UpsertUser,
  type Post,
  type InsertPost,
  type Promotion,
  type InsertPromotion,
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations - Required for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, data: { firstName?: string; lastName?: string }): Promise<User | undefined>;
  deleteUser(id: string): Promise<void>;

  // Post operations
  getAllPosts(tagFilter?: string): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Promotion operations
  getAllPromotions(codeFilter?: string): Promise<Promotion[]>;
  getPromotion(id: string): Promise<Promotion | undefined>;
  createPromotion(promotion: InsertPromotion): Promise<Promotion>;
}

export class DatabaseStorage implements IStorage {
  // User operations - Required for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: { firstName?: string; lastName?: string }): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  // Post operations
  async getAllPosts(tagFilter?: string): Promise<Post[]> {
    if (tagFilter) {
      return await db.select().from(posts)
        .where(sql`${tagFilter} = ANY(${posts.tags})`)
        .orderBy(sql`${posts.createdAt} DESC`);
    }
    return await db.select().from(posts).orderBy(sql`${posts.createdAt} DESC`);
  }

  async getPost(id: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async createPost(postData: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(postData).returning();
    return post;
  }

  // Promotion operations
  async getAllPromotions(codeFilter?: string): Promise<Promotion[]> {
    if (codeFilter) {
      return await db.select().from(promotions)
        .where(ilike(promotions.code, `%${codeFilter}%`))
        .orderBy(sql`${promotions.createdAt} DESC`);
    }
    return await db.select().from(promotions).orderBy(sql`${promotions.createdAt} DESC`);
  }

  async getPromotion(id: string): Promise<Promotion | undefined> {
    const [promotion] = await db.select().from(promotions).where(eq(promotions.id, id));
    return promotion;
  }

  async createPromotion(promotionData: InsertPromotion): Promise<Promotion> {
    const [promotion] = await db.insert(promotions).values(promotionData).returning();
    return promotion;
  }
}

export const storage = new DatabaseStorage();
