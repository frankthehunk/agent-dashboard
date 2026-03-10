# Agent Dashboard - Office View SPEC

## Project Overview
- **Project name**: Agent Dashboard Office View
- **Type**: Top-down RTS-style dashboard visualization
- **Core functionality**: Real-time visualization of autonomous agent operations as an office floor with workers, desks, filing cabinets, and meeting rooms
- **Target users**: Glanceable from across room - for monitoring agent status at a glance

## Visual & Rendering Specification

### Scene Setup
- **View**: Top-down 2D isometric-style office floor
- **Layout**: Office floor plan with distinct zones
- **Background**: Office floor texture (subtle wood grain or carpet pattern)

### Color Palette (Mid-Century Modern / Incredibles-style)
- **Primary Navy**: #1a2744 (walls, main structure)
- **Accent Orange**: #d4652f (highlights, active states)
- **Cream**: #f5f1e6 (desks, surfaces)
- **Teal**: #2d8a8b (secondary accents)
- **Background**: #2a2a2a (dark floor)

### Typography
- **Headers**: Archivo Black (bold, geometric)
- **Body**: IBM Plex Sans (clean, readable)
- **Monospace**: For data/stats

### Office Elements

#### 1. Workers (Agents) - 6 agents displayed
- **Visual**: Little people icons/shapes (circle head + body)
- **Size**: ~60px tall
- **Colors**: Based on status
- **Status indicators**:
  - 🟢 Green (#22c55e): Working - actively coding/deploying
  - 🟡 Yellow (#eab308): Idle - waiting for tasks
  - 🔴 Red (#ef4444): Error - task failed
  - 🔵 Blue (#3b82f6): Thinking - processing/researching

#### 2. Desks (Active Tasks)
- **Visual**: Rectangular desks with geometric shapes
- **Size**: ~100px x 60px
- **Color**: Cream (#f5f1e6) base with status accent border
- **Info displayed**: Task name, progress bar
- **Asymmetric border-radius**: More rounded on one corner

#### 3. Filing Cabinets (Repos/Projects)
- **Visual**: Tall rectangular cabinets (vertical drawers)
- **Size**: ~80px wide x 120px tall
- **Color**: Navy (#1a2744) with teal drawer handles
- **Info displayed**: Repo name, last commit time, commit count

#### 4. Meeting Rooms (Active Sessions)
- **Visual**: Large enclosed rooms with glass doors
- **Size**: ~200px x 150px
- **Color**: Navy walls, teal door accents
- **Info displayed**: Session name, participants, duration

### Real-Time Data Display

#### Top Stats Bar
- Total commits today
- Active tasks
- Uptime
- Errors count
- Content published

#### GitHub Integration Panel
- Recent commits list (scrollable)
- Commit messages with timestamps
- Branch info

#### Activity Feed
- Real-time activity log
- Timestamped entries
- Color-coded by type (deploy, commit, error, config)

## Interaction Specification

### Visual-Only Dashboard
- No direct interaction required (glanceable display)
- Auto-refresh every 30 seconds
- Smooth CSS transitions for status changes

### Responsive Design
- Desktop optimized (1920x1080+)
- Tablet fallback (scaled down)
- Mobile: stacked view

## Technical Implementation

### Stack
- Next.js 16 with App Router
- Tailwind CSS for styling
- Lucide React for icons
- CSS custom properties for theming

### Components
1. `OfficeFloor` - Main container
2. `Worker` - Agent visualization
3. `Desk` - Task visualization
4. `FilingCabinet` - Repo visualization
5. `MeetingRoom` - Session visualization
6. `StatsBar` - Top statistics
7. `CommitPanel` - GitHub commits
8. `ActivityFeed` - Activity log

### Data Sources
- GitHub API for commits/stats
- Mock data for agent/task states (expandable to real data)

## Acceptance Criteria

1. ✅ Office floor renders with all element types
2. ✅ Each worker shows distinct status color
3. ✅ Filing cabinets display repo info
4. ✅ Meeting rooms show session info
5. ✅ Stats bar shows real GitHub data
6. ✅ Colors match mid-century modern palette exactly
7. ✅ Fonts: Archivo Black + IBM Plex Sans loaded
8. ✅ Geometric shapes with asymmetric border-radius
9. ✅ Glanceable from distance (large, clear visuals)
10. ✅ Responsive on different screen sizes
