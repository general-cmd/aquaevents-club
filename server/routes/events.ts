import { Router } from "express";
import { getEventsCollection } from "../services/mongodb";

const router = Router();

// GET /api/events - Get all upcoming events
router.get("/", async (req, res) => {
  try {
    const eventsCollection = await getEventsCollection();

    // Get query parameters for filtering
    const { discipline, region, limit = "50" } = req.query;

    // Build filter - only show upcoming events (date >= today)
    const today = new Date().toISOString().split('T')[0];
    const filter: any = {
      date: { $gte: today },
      is_active: true
    };

    if (discipline) {
      filter.discipline = discipline;
    }

    if (region) {
      filter["location.region"] = region;
    }

    // Fetch events
    const events = await eventsCollection
      .find(filter)
      .sort({ date: 1 }) // Sort by date ascending
      .limit(parseInt(limit as string))
      .toArray();

    res.json({
      success: true,
      count: events.length,
      events: events
    });

  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch events",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// GET /api/events/slug/:slug - Get single event by URL slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const eventsCollection = await getEventsCollection();
    const { slug } = req.params;

    // Find event by canonical URL containing the slug
    const event = await eventsCollection.findOne({
      "seo.canonical": { $regex: slug, $options: "i" }
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found"
      });
    }

    res.json({
      success: true,
      event: event
    });

  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch event",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// GET /api/events/stats - Get event statistics
router.get("/stats", async (req, res) => {
  try {
    const eventsCollection = await getEventsCollection();
    const today = new Date().toISOString().split('T')[0];

    const [totalEvents, upcomingEvents, disciplineCounts] = await Promise.all([
      eventsCollection.countDocuments({ is_active: true }),
      eventsCollection.countDocuments({ date: { $gte: today }, is_active: true }),
      eventsCollection.aggregate([
        { $match: { date: { $gte: today }, is_active: true } },
        { $group: { _id: "$discipline", count: { $sum: 1 } } }
      ]).toArray()
    ]);

    res.json({
      success: true,
      stats: {
        total: totalEvents,
        upcoming: upcomingEvents,
        past: totalEvents - upcomingEvents,
        byDiscipline: disciplineCounts
      }
    });

  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;

