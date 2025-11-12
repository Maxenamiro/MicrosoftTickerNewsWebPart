# SharePoint Ticker News WebPart

A comprehensive, enterprise-ready news ticker solution for SharePoint Online built with SPFx, React, and TypeScript. Designed for displaying time-sensitive announcements with advanced management capabilities.

## ✨ Features

### 📢 Message Display System
- **Homepage Banner**: Prominent vertical stacking of active ticker messages
- **Multi-message Support**: Display multiple active announcements simultaneously
- **Chronological Order**: Most recent messages appear on top
- **Visual Hierarchy**: Clear distinction between different message types
- **Responsive Design**: Adapts to different screen sizes and devices
- **Archive Section**: Collapsible accordion for past announcements

### 🎨 Category Management
- **Maintenance (Wartung)**: Orange theme (#FFEECB background, #FDB321 borders)
- **Information**: Blue theme (#D9F5F7 background, #2DBECD borders)  
- **Incident (Störung)**: Red theme (#FFE4EB background, #E61E50 borders)
- **Custom Icons**: Category-specific icons with visual indicators
- **Visual Consistency**: Same styling across banner and archive views
- **Border Styling**: Top and bottom borders matching category colors

### ⏰ Smart Scheduling & Activation
- **Date Range Control**: Automatic activation between StartDate and EndDate
- **Real-time Validation**: Continuous date checking for active/inactive status
- **No Manual Toggle**: Eliminates need for "Active" checkbox fields
- **Time Zone Aware**: Proper date handling across different time zones
- **German Date Format**: Supports DD.MM.YYYY date format display

### 👁️ Advanced Visibility Modes
- **Always Visible (Immer)**: 
  - Cannot be dismissed by users
  - No close button displayed
  - Persistent until end date

- **Per Session (pro Sitzung)**:
  - Dismissible within browser session
  - Resets when browser is closed/restarted
  - Uses sessionStorage with unique session IDs
  - Automatic session management

- **One-time Dismissible (Einmalig)**:
  - Permanent dismissal for each user
  - Uses localStorage for persistence
  - Remains hidden across sessions
  - User-specific preferences

### 🔧 Content Management
- **SharePoint List Backend**: All content managed through custom list
- **Rich Text Support**: Description field supports formatted content
- **External Links**: Optional "Mehr" links for additional information
- **Flexible Fields**: Title, description, category, dates, visibility, links
- **Date Display**: Formatted date (DD.MM) shown before each title

### 🎪 User Interface Features
- **Icon Integration**: Visual category indicators
- **Close Button**: Custom "×" close button for dismissible messages
- **Alle Ticker Button**: Smart navigation to full ticker page
- **Auto-hide Navigation**: "Alle Ticker" button hidden on archive page
- **Hover Effects**: Interactive hover states for buttons
- **Accordion Styling**: Custom purple theme (#503291) for archive section
- **Chevron Indicators**: Custom triangle indicators for accordion state

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or later
- SharePoint Framework 1.17.4
- SharePoint Online environment
- App Catalog configured
- SharePoint List permissions

### Installation
1. Clone this repository
```bash
git clone https://github.com/Maxenamiro/MicrosoftTickerNewsWebPart.git
cd MicrosoftTickerNewsWebPart


Install dependencies
npm install

build and run loaclly
gulp serve

Deployment to SharePoint
Bundle the solution for production:

bash
gulp bundle --ship
Package the solution:

bash
gulp package-solution --ship
Upload the .sppkg file from sharepoint/solution folder to your App Catalog

Add the web part to your SharePoint page

SharePoint List Setup
Create a list named "TickerNewsList" with the following columns:

Column Name	Type	Description	Required
Title	Single line of text	Main message headline	Yes
Beschreibung	Multiple lines of text	Additional details	No
Kategorie	Choice	Values: Wartung, Information, Störung	Yes
Link	Hyperlink	Optional link to more information	No
Sichtbarkeit	Choice	Values: Immer, pro Sitzung, Einmalig	Yes
StartDatum	Date and Time	When to start showing the message	Yes
EndDatum	Date and Time	When to stop showing the message	Yes
Datum	Date and Time	Message publication date	Yes

List View Configuration
Create a view that shows all columns for easy management. Recommended to sort by StartDatum descending.

Asset Setup
Upload category icons to Site Assets library:

/sites/YourSite/SiteAssets/TickerNews/Wartung.png

/sites/YourSite/SiteAssets/TickerNews/Information.png

/sites/YourSite/SiteAssets/TickerNews/Störung.png

Web Part Configuration
Show Archive: Property pane toggle to show/hide past tickers accordion

Responsive Width: Automatically adjusts to container width

🏗️ Architecture
Technology Stack
SharePoint Framework (SPFx) 1.17.4: Modern SharePoint development framework

React 16.13.1: Component-based UI with hooks and functional components

TypeScript 4.6.2: Type-safe development experience

PnP JS Core 3.11.0: Efficient SharePoint data operations

Fluent UI React 8.106.3: Microsoft design system components

CSS Modules: Scoped styling solution

React Hooks: useState, useEffect, useMemo for state management

Data Flow
Data Loading: PnP JS fetches items from TickerNewsList

Field Mapping: SharePoint fields mapped to TypeScript interface

Visibility Check: Each item evaluated against date range and user preferences

Rendering: Components render based on filtered and sorted data

User Interaction: Dismiss actions update storage and trigger re-render

Storage Strategy
Session Storage: For "pro Sitzung" dismissal tracking (session-specific)

Local Storage: For "Einmalig" dismissal tracking (persistent)

Unique Keys: Prevention of storage conflicts between different tickers

Automatic Cleanup: Session-based automatic cleanup

Component Structure
TickerNews: Main component handling data loading and state

TickerLine: Individual ticker message display

Archive Accordion: Collapsible section for past messages

Action Buttons: Close and navigation buttons

🔧 Advanced Configuration
Customization Points
Colors and Styling

// Category Colors
--maintenance-bg: #FFEECB;
--maintenance-border: #FDB321;
--information-bg: #D9F5F7;
--information-border: #2DBECD;
--incident-bg: #FFE4EB;
--incident-border: #E61E50;

// Accordion Colors
--accordion-bg: #ebe7f6;
--accordion-text: #503291;

Date Format
Modify the formatDate function to support different date formats:

// Current: DD.MM
// Alternatives: MM/DD, YYYY-MM-DD, etc.

Icon Management
Update icon paths in the getIcon function:

const getIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'wartung':
      return '/sites/Yoursite/SiteAssets/TickerNews/Wartung.png';
    // ... other cases
  }
}

Web Part Properties
showArchive: boolean - Controls archive section visibility

Extensible for future features like category filtering, date formats, etc.

💡 Use Cases
🏢 Enterprise Scenarios
IT Operations
System Maintenance: Planned downtime notifications

Incident Alerts: Live outage and issue communications

Update Notifications: Software and security update announcements

Network Status: Network availability and performance alerts

Human Resources
Policy Updates: New company policies and procedures

Event Announcements: Company events, meetings, and celebrations

Benefits Information: Open enrollment and benefits updates

Compliance Alerts: Important compliance and regulatory notices

Production & Manufacturing
Production Status: Line status and production updates

Safety Alerts: Important safety notices and procedures

Quality Updates: Quality control and assurance announcements

Supply Chain: Supplier and logistics updates

Corporate Communications
Company News: Major company announcements and news

Executive Updates: Messages from leadership

Department News: Cross-departmental communications

Emergency Alerts: Critical emergency notifications

🎯 Industry Applications
Manufacturing
Real-time production line status

Equipment maintenance schedules

Safety protocol updates

Quality control alerts

Healthcare
System downtime for medical records

Compliance requirement updates

Patient care protocol changes

Emergency procedure alerts

Financial Services
Trading system status

Compliance regulation updates

Security breach alerts

System maintenance windows

Education
System maintenance for learning platforms

Emergency campus alerts

Academic calendar updates

Important deadline reminders

🔒 Security & Compliance
Security Features
SharePoint Integration: Leverages existing SharePoint permissions and security

Data Validation: Input validation on both client and server sides

XSS Protection: Safe HTML rendering and content sanitization

CSRF Protection: Built-in SharePoint protection mechanisms

Privacy Compliance
User Data: Only stores dismissal preferences (no personal data)

Storage Consent: Uses standard browser storage mechanisms

Data Minimization: Stores only necessary information

Transparency: Clear visibility of what data is stored

Access Control
SharePoint Permissions: Inherits parent site/list permissions

Reader Access: Read-only for end users

Contributor Access: Manage content for authorized users

Admin Access: Full control for administrators

🛠️ Development
Building the Project

# Development build
gulp serve

# Production build
gulp bundle --ship
gulp package-solution --ship

# Local testing
gulp serve --nobrowser

Key Files
TickerNews.tsx - Main React component

TickerNewsWebPart.ts - SPFx web part entry point

TickerNews.module.scss - Styles and theming

ITickerNewsProps.ts - TypeScript interfaces

📞 Support
Getting Help
Check Documentation: Review this README and code comments

Issues: Create a detailed issue on GitHub

Troubleshooting: Check browser console for errors

Validation: Verify SharePoint list structure and permissions

Common Issues
Icons not displaying: Check icon paths and file permissions

Messages not showing: Verify date ranges and list permissions

Close button not working: Check browser storage permissions

Accordion not styling: Verify CSS customizations

Debugging
Enable console logging by checking browser developer tools. The web part includes comprehensive logging for troubleshooting.

🤝 Contributing
We welcome contributions! Here's how you can help:

Reporting Issues
Use the GitHub Issues template

Include SharePoint environment details

Provide steps to reproduce

Include error messages and screenshots

Feature Requests
Describe the use case

Explain the expected behavior

Suggest implementation approach if possible

Code Contributions
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow TypeScript best practices

Maintain consistent code style

Add comments for complex logic

Update documentation accordingly

Test across different browsers

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🏆 Credits
Developed by Maxenamiro
GitHub Profile

Acknowledgments
SharePoint Framework team for the excellent development platform

PnP JS Core team for SharePoint data access utilities

Fluent UI team for the design system components

Microsoft for the SharePoint ecosystem

Inspired By
Real-world enterprise communication needs and the requirement for prominent, time-sensitive announcement systems in large organizations.

⭐ If this project helped you, please give it a star on GitHub!

🔔 Watch the repository to get notified of new releases and updates

🐛 Found a bug? Please open an issue so we can fix it!