# Notification System Design: Stage 1

## Core Mechanics

Stage 1 introduces a streamlined sorting pipeline built to highlight urgent alerts without drowning the user in data. The logic is structured around a two-step prioritization filter followed by a strict display limit.

### 1. The Priority Hierarchy
The system assigns immutable significance to incoming messages based on their category:
* **Apex Priority**: `Placement`
* **Intermediate Priority**: `Result`
* **Baseline Priority**: `Event`

The algorithm strictly enforces this tier list. A `Placement` notification will always outrank an `Event` notification, regardless of when they were dispatched.

### 2. Recency Tie-Breaker
Within any single priority bracket (for instance, a cluster of `Result` alerts), the engine falls back to chronological sorting. By computing the difference between generation timestamps, the most recently issued alert floats to the top of its respective tier.

### 3. Visibility Cap
To maintain a high signal-to-noise ratio, the rendering engine aggressively truncates the final dataset. Regardless of total volume, only the **absolute top 10** notifications survive the cut to be displayed on the high-priority dashboard.

### 4. Handling Ingress
To ensure efficient processing of incoming data streams, new notifications are appended directly to the active state array in memory. The sorting algorithm is then re-executed, and the array is immediately sliced back down to 10 elements. This client-side processing approach eliminates the need for redundant network round-trips when sorting.

## Key Assumptions
* **Consistent Payload Schemas**: The system assumes every notification payload reliably includes an actionable `date` string (ISO format) and a strict `type` string matching our priority keys. Anomalous types fall to the bottom of the list.
* **Volume Thresholds**: We assume the total volume of raw alerts fetched simultaneously is small enough that client-side sorting does not freeze the main execution thread.
* **Read-Only Context**: For Stage 1, we assume all retrieved notifications are meant to be viewed uniformly, meaning individual "read/unread" states are not tracked locally.
