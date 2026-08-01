import supertest from "supertest";
import { app } from "./server";

describe("Task API", () => {
  it("should return API running message", async () => {
    const res = await supertest(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("API running");
  });
});
