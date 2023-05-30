import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFuncs } from "../../../utils/types";
import { connect } from "@/utils/connectDB";
import Blog from "@/models/blog";
import NextCors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // await NextCors(req, res, {
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "https://bloggy-mohit-thapliyal.vercel.app",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });

  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  // GRAB ID FROM req.query (where next stores params)
  const id: string = req.query.id as string;

  // Potential Responses for /todos/:id
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect(); // connect to database
      res.json(await Blog.findById(id).catch(catcher));
    },
    // RESPONSE PUT REQUESTS
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect(); // connect to database
      res.json(
        await Blog.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      );
    },
    // RESPONSE FOR DELETE REQUESTS
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect(); // connect to database
      res.json(await Blog.findByIdAndRemove(id).catch(catcher));
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  res.setHeader("Access-Control-Allow-Origin", "https://bloggy-mohit-thapliyal.vercel.app")
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
