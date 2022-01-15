import { requireSession } from "@clerk/nextjs/api";
import jwt from "jsonwebtoken";

export default requireSession(async (req, res) => {
  const payload = {
    userId: req.session.userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const token = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET);
  res.status(200).json({ jwt: token });
});
