import "dotenv/config";

export default {
  expo: {
    name: "eventloop-validator",
    slug: "eventloop-validator",
    version: "1.0.0",
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
};
