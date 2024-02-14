import Stripe from "stripe";

export const stripe = Stripe(process.env.SECRET_KEY);