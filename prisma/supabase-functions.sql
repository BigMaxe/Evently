-- Function: Automatically update available Tickets when booking is created
CREATE OR REPLACE FUNCTION update_available_tickets()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE "Event"
        SET "availableTickets" = "availableTickets" - NEW."ticketCount"
        WHERE id = NEW."eventId";
    ELSEIF (TG_OP = 'DELETE') THEN
        UPDATE "Event"
        SET "availableTickets" = "availableTickets" + OLD."ticketCount"
        WHERE id = OLD."eventId";
    ELSEIF (TG-OP = 'UPDATE') THEN
        UPDATE "Event"
        SET "availableTickets" = "availableTickets" + OLD."ticketCount" - NEW."ticketCount"
        WHERE id = NEW."eventId";
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--Trigger: Update tickets on booking changes
DROP TRIGGER IF EXISTS booking_ticket_update ON "Booking";
CREATE TRIGGER booking_ticket_update
AFTER INSERT OR UPDATE OR DELETE ON "Booking"
FOR EACH ROW
EXECUTE FUNCTION update_available_tickets();


-- Function: Prevent overbooking
CREATE OR REPLACE FUNCTION check_tickets_availability()
RETURNS TRIGGER AS $$
DECLARE
    available_count INT;
BEGIN
    SELECT "availableTickets" INTO available_count
    FROM "Event"
    WHERE id = NEW."eventId";

    IF available_count < NEW."ticketCount" THEN
        RAISE EXCEPTION 'Not enough tickets available. only % tickets remaining.', available_count;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--Trigger: Check availability before booking
DROP TRIGGER IF EXISTS check_availability_before_booking ON "Booking";
CREATE TRIGGER check_availability_before_booking
BEFORE INSERT ON "Booking"
FOR EACH ROW
EXECUTE FUNCTION check_ticket_availability();


--Function: Automatically update 'updateedAt' tiemstamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--Triggers: Auto-update timestamps
DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_updated_at ON "Event";
CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "Event"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_updated_at ON "Booking";
CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "Booking"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

--Function: auto-update event status based on date
CREATE OR REPLACE FUNCTION update_event_upcoming_status()
RETURNS void AS $$
BEGIN
    UPDATE "Event"
    SET Upcoming = CASE
        WHEN DATE < NOW() THEN false
        ELSE true
    END;
END;
$$ LANGUAGE plpgsql;

-- SELECT update_event_upcoming_status();

--View: Get event statistics
CREATE OR REPLACE VIEW event_stats AS
SELECT
    e.id,
    e.title,
    e."totalTickets",
    e."availableTickets",
    (e."totalTickets" - e."availableTickets") as "ticketsSold",
    COUNT(b.id) as "totalBookings",
    COALESCE(SUM(B."totalAmount"), 0) as "totalRevenue"
FROM "Event" e
LEFT JOIN "Booking" b ON e.id = b."eventId"
GROUP BY e.id, e.title, e."totalTickets", e."availableTickets";

--View: User booking history with event details
CREATE OR REPLACE VIEW user_booking_details AS
SELECT
    b.id as "bookingId",
    b."ticketCount",
    b."totalAmount",
    b."paymentStatus",
    b."bookingDate",
    u.id as "userId",
    u.name as "userName",
    u.email as "userEmail",
    e.id as "eventId",
    e.title as "eventTitle",
    e.location as "eventLocation",
    e.date as "eventDate",
    e.image as "eventImage"
FROM "Booking" b
JOIN "User" u ON b."userId" = u.id
JOIN "Event" e ON b."eventId" = e.id;


--indexex for better performance
CREATE INDEX IF NOT EXISTS idx_booking_user_event On "Booking" ("userId", "eventId");
CREATE INDEX IF NOT EXISTS idx_event_date_category ON "Event"(date, category);
CREATE INDEX IF NOT EXISTS idx_event_featured_upcoming ON "Event"(featured, upcoming) WHERE featured = true AND upcoming = true;

-- Function: Clean up expired verification tokens (optional)
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
    DELETE FROM "VerificationToken"
    WHERE expires < NOW();
END;
$$ LANGUAGE plpgsql;
