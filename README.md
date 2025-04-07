
# ⚠️ Currently WIP ⚠️
> This project is a **work in progress**. Features, structure, and documentation are still evolving.

---

# 🧪 Simple Test Case Manager

A lightweight, no-nonsense test management tool for teams or testers who just want to start testing while documenting their progress — without drowning in enterprise bloat.

# 🤔 Why another test manager?
Most open-source and enterprise tools are bloated, overengineered, and sometimes feel like they’re designed to slow you down.

You end up writing pages of single-use documents instead of actually testing.
And enterprise solutions? Often overpriced, and not even that good.

# 🎯 Main features
Built using React.js and NestJS

* **Test Projects** – high-level containers for your collections & cases
* **Test Collections** – logical grouping of related test cases
* **Test Cases** – individual tests with steps, parameters & expected results
* **Test Steps** – Markdown-supported steps with statuses
* **Test Runs** – execute full collections or hand-picked test cases
* **Parameterized Testing** – generate pairwise/full test matrices
* **Automation Support** – clean, documented API for full integration
* **Reporting** – minimal, readable reports on test runs, cases & bugs
* **Bug Tracking** – raise and track issues with built-in tools
* **JIRA Integration** – optional link to external issue management
* **Import/Export** – CSV-based input/output


# 🔐 Role-based Authentication
Users are assigned roles with permission-based access:

* Admin
* Tester
* Test Manager _(optional/experimental)_

# 🛡️ Permission Management

* Permission matrix
* Future support for project/user-based role scoping

# 🧱 Object Hierarchy
1. Test Project
2. Test Collection
3. Test Case
4. Test Run

# 👤 Main User Flows
## 👑 Admin
* Create & approve user accounts
* Block users (preserve test history)
* Manage permissions
* Edit/archive projects
* View/customize reports
* Access statistics

## 🧪 Tester

* CRUD + cloning
  * Projects
  * Suites
  * Cases
  * Steps
  * Runs

* Access reports:
  * Test Run Report
  * Test Case Report
  * Bug Report
  * View statistics

## 📋 Test Manager
Set case/suite/project priorities

Schedule test runs

Assign tests to testers

Oversee test progress and generate reports per tester

## 🗄️ Database
PostgreSQL
Full ER diagram:
![ER](er.png)

# 🔧 Developer Notes
## 🔄 Update NestJS packages:
```bash
npx npm-check-updates "/nestjs*/" -u
```
