import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create consultation
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.json({ success: true, consultation });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "유효하지 않은 데이터입니다.",
          errors: error.errors 
        });
      } else {
        console.error("Error creating consultation:", error);
        res.status(500).json({ 
          success: false, 
          message: "상담 신청 중 오류가 발생했습니다." 
        });
      }
    }
  });

  // Get all consultations
  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getAllConsultations();
      res.json({ success: true, consultations });
    } catch (error) {
      console.error("Error fetching consultations:", error);
      res.status(500).json({ 
        success: false, 
        message: "상담 목록을 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
