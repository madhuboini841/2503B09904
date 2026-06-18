# Stage 1 Implementation

## Notification Fetching
Notifications are retrieved from an external API using Axios within a dedicated `notificationService.js` module. To guarantee smooth development and evaluation, a fallback mock data mechanism is invoked if the primary API is unreachable or times out, ensuring the UI remains populated with realistic sample data under all conditions.

## Sorting Logic
The priority sorting engine assigns numeric weights to categories to enforce a strict hierarchy:
1. `Placement` (Weight: 3)
2. `Result` (Weight: 2)
3. `Event` (Weight: 1)
Within the same category weight, chronological recency acts as the tie-breaker. This multi-pass algorithm guarantees that the most critical and recent alerts always bubble to the top.

## Assumptions
- The core API payload conforms to a stable structure containing `id`, `title`, `message`, `type`, and `date` fields.
- Recency relies on standard ISO-8601 string parsing via JavaScript's native Date object.
- It is safe to cache read states locally since this is a client-side interface without user authentication.

# Stage 2 Implementation

## Filtering
A robust, case-insensitive filter system processes the raw dataset locally using React's `useMemo` hook. The search bar tracks string inclusions in the title, while the category dropdown explicitly checks exact type matches. Both filters operate concurrently to drill down data instantaneously.

## Viewed Status Tracking
To provide persistence across sessions, the application utilizes a custom `useViewedStatus` React hook interacting with the browser's `localStorage`. Notification IDs are pushed into an array upon interaction, and the UI reacts immediately by swapping "NEW" chips for "VIEWED" indicators and applying a subtle opacity shift to the element.

## Error Handling
Axios operations are wrapped in standard `try...catch` blocks. Specific error strings are surfaced directly to the user interface via Material UI `Alert` banners. Data fetching states are strictly monitored with boolean flags to prevent layout shifts and display `Skeleton` or `CircularProgress` loaders.

## User Experience Improvements
The UI replicates a professional enterprise environment. The layout centers on visual hierarchy, utilizing Material UI's grid structures, balanced padding, and soft shadow elevations. Redundant space has been eliminated, while interactive elements respond with subtle, premium hover effects. Data density is prioritized over flashy styling, delivering a streamlined, recruiter-friendly administrative dashboard.
