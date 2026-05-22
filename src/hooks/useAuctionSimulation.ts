import { useEffect, useRef } from "react";
import { useAuctionStore } from "@/store/auctionStore";

const COMPETING_BIDDERS = [
  "AutoBidder_88",
  "QuickBid_Pro",
  "CarCollector_KW",
  "LuxuryHunter",
  "SpeedBidder_X",
];

export function useAuctionSimulation(auctionId: string, enabled: boolean = true) {
  const { auctions, addBid, getAuctionById } = useAuctionStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const auction = getAuctionById(auctionId);

  useEffect(() => {
    if (!enabled || !auction || auction.status !== "live") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Simulate competing bids every 8-15 seconds
    const simulateBid = () => {
      const currentAuction = getAuctionById(auctionId);
      if (!currentAuction || currentAuction.status !== "live") return;

      // 40% chance of a competing bid
      if (Math.random() < 0.4) {
        const increment = Math.floor(Math.random() * 5000) + 1000; // 1,000-6,000 GHS increment
        const newBid = currentAuction.currentBid + increment;
        const bidder = COMPETING_BIDDERS[Math.floor(Math.random() * COMPETING_BIDDERS.length)];

        addBid({
          id: `sim-${Date.now()}-${Math.random()}`,
          auctionId,
          bidder,
          amount: newBid,
          timestamp: Date.now(),
        });
      }
    };

    // Initial bid after 3 seconds
    const initialTimeout = setTimeout(simulateBid, 3000);

    // Then interval every 8-15 seconds
    intervalRef.current = setInterval(simulateBid, Math.random() * 7000 + 8000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [auctionId, enabled, auction, getAuctionById, addBid]);

  return auction;
}
