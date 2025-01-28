import mongoose from "mongoose";
import request from "supertest";
import app from "../index.js";
import connectMongoDB from "../db/connectMongoDB.js";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
  // Sambungkan ke MongoDB sebelum semua tes
  await connectMongoDB();
});

afterAll(async () => {
  // Tutup koneksi MongoDB setelah semua tes selesai
  await mongoose.disconnect();
});

// Tes untuk endpoint /api/auth/sign-up
describe("Sign Up User /auth", () => {
  // SIGN UP USER DENGAN FORM YANG BENAR
  it("should return 201 when user is successfully signed up", async () => {
    const form = {
      name: "Andika Syamsiana",
      username: "kasya14045",
      email: "andika1445@gmail.com",
      password: "andika1445",
      phone: "08572632412",
      token: null,
    };

    const response = await request(app).post("/api/auth/sign-up").send(form);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Sign Up Success!");
  });

  // SIGN UP DENGAN EMAIL YANG SUDAH DIGUNAKAN
  it("should return 409 when user email already used", async () => {
    const form = {
      name: "Andika Syamsiana",
      username: "kasya14045",
      email: "andika1445@gmail.com",
      password: "andika14045",
      phone: "08572632412",
      token: null,
    };

    const response = await request(app).post("/api/auth/sign-up").send(form);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Email already used!");
  });

  // SIGN UP DENGAN FORM YANG KOSONG
  it("should return 500 when form empty", async () => {
    const form = {
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      token: null,
    };

    const response = await request(app).post("/api/auth/sign-up").send(form);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Error di : SignUpToken");
  });
});

// Tes untuk endpoint /api/auth/sign-in
describe("Sign In User /auth", () => {
  // LOGIN DENGAN EMAIL DAN PASSWORD YANG BENAR
  it("should return 200 when user is successful logged in", async () => {
    // Pastikan email dan password ini sesuai dengan data yang ada di database
    const loginData = {
      email: "andika1445@gmail.com",
      password: "andika1445",
      token: "token123",
    };

    const response = await request(app)
      .post("/api/auth/sign-in")
      .send(loginData);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Sign In Success!");
  });

  // LOGIN DENGAN EMAIL YANG SALAH
  it("should return 404 when user is failed to logged in with wrong email", async () => {
    // Login dengan email yang salah
    const loginData = {
      email: "andika@gmail.com",
      password: "andika14045",
      token: "token123",
    };

    const response = await request(app)
      .post("/api/auth/sign-in")
      .send(loginData);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User Not Found!");
  });

  // LOGIN DENGAN PASSWORD YANG SALAH
  it("should return 400 when user is failed to logged in with wrong password", async () => {
    // Login dengan password yang salah
    const loginData = {
      email: "andika14045@gmail.com",
      password: "andika",
      token: "token123",
    };

    const response = await request(app)
      .post("/api/auth/sign-in")
      .send(loginData);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Wrong Password!");
  });
});

// Tes untuk endpoint /api/movies/get-favorite
describe("Get Movies Favorites /movies", () => {
  // GET FAVORITE MOVIES DENGAN BENAR
  it("should return 200 when user is successful get all favorite movies", async () => {
    const form = {
      email: "andika1445@gmail.com",
      token: "token123",
    };

    const response = await request(app).get(
      `/api/movies/get-favorite/${form.email}/${form.token}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Get favorite movies success!");
  });

  // GET FAVORITE MOVIES DENGAN SALAH
  it("should return 401 when user is Failed get all favorite movies", async () => {
    const form = {
      email: "andika1445@gmail.com",
      token: "token123234",
    };

    const response = await request(app).get(
      `/api/movies/get-favorite/${form.email}/${form.token}`
    );

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });
});

// Tes untuk endpoint /api/movies/add-favorite
describe("Add Movies Favorites /movies", () => {
  // ADD FAVORITE MOVIES DENGAN BENAR
  it("should return 201 when user is successful add favorite movies", async () => {
    const form = {
      email: "andika1445@gmail.com",
      token: "token123",
      data: {
        id: 4,
        title: "Naruto",
        description: "Anak Yatim",
      },
    };

    const response = await request(app)
      .post(`/api/movies/add-favorite`)
      .send(form);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Add Favorite Movie Success!");
  });

  // REMOVE FAVORITE MOVIES DENGAN BENAR
  it("should return 201 when user is successful remove favorite movies", async () => {
    const form = {
      email: "andika1445@gmail.com",
      token: "token123",
      data: {
        id: 4,
        title: "Naruto",
        description: "Anak Yatim",
      },
    };

    const response = await request(app)
      .post(`/api/movies/add-favorite`)
      .send(form);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Remove Favorite Movie Success!");
  });
});

// Tes untuk endpoint /api/auth/sign-out
describe("Sign Out User /auth", () => {
  // SIGN OUT USER DENGAN INVALID TOKEN
  it("should return 401 when user is failled to signed out", async () => {
    const form = {
      email: "andika1445@gmail.com",
      token: "roken1241231",
    };

    const response = await request(app).delete("/api/auth/sign-out").send(form);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid Token");
  });

  // SIGN OUT USER DENGAN BENAR
  it("should return 201 when user is successfully signed out", async () => {
    const form = {
      email: "andika1445@gmail.com",
      token: "token123",
    };

    const response = await request(app).delete("/api/auth/sign-out").send(form);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Sign Out Success!");
  });
});
