import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Auction } from "@/data/mock-data";
import { AUCTIONS } from "@/data/mock-data";

interface Bid {
  id: string;
  auctionId: string;
  bidder: string;
  amount: number;
  timestamp: number;
}

interface AuctionState {
  auctions: Auction[];
  bids: Bid[];
  userBids: Map<string, number>; // auctionId -> highest bid amount

  setAuctions: (auctions: Auction[]) => void;
  placeBid: (auctionId: string, amount: number) => Promise<void>;
  addBid: (bid: Bid) => void;
  getUserHighestBid: (auctionId: string) => number | undefined;
  getAuctionById: (id: string) => Auction | undefined;
  updateAuctionStatus: (id: string, status: Auction["status"]) => void;
}

export const useAuctionStore = create<AuctionState>()(
  persist(
    (set, get) => ({
      auctions: AUCTIONS,
      bids: [],
      userBids: new Map(),

      setAuctions: (auctions) => set({ auctions }),

      placeBid: async (auctionId: string, amount: number) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        const state = get();
        const auction = state.auctions.find((a) => a.id === auctionId);

        if (!auction) {
          throw new Error("Auction not found");
        }

        if (amount <= auction.currentBid) {
          throw new Error("Bid must be higher than current bid");
        }

        // Add bid
        const newBid: Bid = {
          id: `bid-${Date.now()}-${Math.random()}`,
          auctionId,
          bidder: "current-user",
          amount,
          timestamp: Date.now(),
        };

        set((state) => ({
          bids: [...state.bids, newBid],
          userBids: new Map(state.userBids).set(auctionId, amount),
          auctions: state.auctions.map((a) =>
            a.id === auctionId ? { ...a, currentBid: amount, bidCount: a.bidCount + 1 } : a,
          ),
        }));
      },

      addBid: (bid) => {
        set((state) => ({
          bids: [...state.bids, bid],
          auctions: state.auctions.map((a) =>
            a.id === bid.auctionId ? { ...a, currentBid: bid.amount, bidCount: a.bidCount + 1 } : a,
          ),
        }));
      },

      getUserHighestBid: (auctionId: string) => {
        return get().userBids.get(auctionId);
      },

      getAuctionById: (id: string) => {
        return get().auctions.find((a) => a.id === id);
      },

      updateAuctionStatus: (id: string, status: Auction["status"]) => {
        set((state) => ({
          auctions: state.auctions.map((a) => (a.id === id ? { ...a, status } : a)),
        }));
      },
    }),
    {
      name: "saints-auction-storage",
      partialize: (state) => ({
        userBids: Array.from(state.userBids.entries()),
      }),
    },
  ),
);
