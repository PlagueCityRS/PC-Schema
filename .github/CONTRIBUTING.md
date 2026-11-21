# Contributing to Plague City

Firstly, thank you for showing interest in contributing to Plague City! Any and all contributions are highly appreciated, whether it's research, code review, think-tanking, or development. Reverse-engineering and maintaining historical accuracy for a project of this scale is quite the endeavor.

While this document covers a lot of ground, it is designed to give you the clearest picture of our process without getting lost in the weeds. For further details about anything touched on here, please check our documentation. If you can't find what you're looking for or need clarification, ask a staff member in our Discord server!

## Project Structure

Being a fork of the Lost City project, there are many similarities in our project structure, alongside a few key differences. Here is how our public repositories fit together:

### Client-Java
The original Java client, decompiled, deobfuscated, and partially renamed. This is our master reference for creating the TypeScript port found in `Client-TS`. This client is still fully functional and will connect to `Engine-TS` if pointed at your hosted address. However, since Oracle effectively killed the Java Applet in 2016, this cannot be viewed in modern browsers and must instead be run as a standalone application.

### Client-TS
The TypeScript port of `Client-Java` that we use (and recommend). TypeScript runs seamlessly in modern browsers as a webclient. Compiled bundles from this repository are committed directly to `Engine-TS`, so you do not need to clone or build this repository just to connect to a locally hosted game engine.

### Engine-TS
This is where the magic happens. This repository contains the core game engine, login server, friend server, and logging server, along with the bundled webclient from `Client-TS`. It does **not** contain content scripts (quests, dialogue, item interactions, skills, etc.).

### Content
This repository contains all content scripts and assets, and is where most day-to-day development happens. It works in conjunction with `Engine-TS` to create a playable game server. **Important:** You must clone `Content` into the **same parent directory** as `Engine-TS`, as the `Engine-TS` build script looks for `../content` to verify and load scripts and assets prior to serving. **If you are using a FAT32 filesystem, you must rename the local repository directory to be `content` with a lowercase c.**

### PC-Schema
Unique to Plague City, this repository holds our database schema and migration scripts. Because our website and game server are intertwined, `PC-Schema` is loaded into dependent projects as a Git submodule. This gives us a single source of truth so database states never desync across services.

---

## Branching Strategy

All of our repositories have 3 permanent branches: `main`, `release`, and `develop` (which may occasionally use revision prefixes, e.g., `349-develop`).

* **`main`**: The live, production-ready codebase. All code here has been fully developed and QA-tested. Pull from this branch if you want to host your own version of Plague City or see our current public state.
* **`release`**: Where features and non-critical bugfixes go for final staging verification before merging into `main`. Code here has already been tested in its feature branch and in `develop`, and is deployed to our staging environment to confirm compatibility with `main`.
* **`develop`**: Our active integration branch. All new work branches off from `develop` and is merged back into `develop` via Pull Request once local testing is complete.

---

## Development Workflow

1. **Fork:** Fork the repositories that you need to make changes to. Set the upstream with `git remote add upstream <PARENT_REPO_URL>`
2. **Ticket:** Notify staff that you've picked up a ticket so we can move it from Ready to In progress.
3. **Branch:** Create an aptly-named branch off `develop`. 
```
git checkout develop
git checkout -b <NEW_BRANCH_NAME>
```
4. **Develop:** Write your code *within the scope of the ticket.*
5. **Pull:** Pull the up-to-date code from the relevant develop branch and fix any merge conflicts prior to local testing.
```b
// replace all instances of "develop" with the proper branch name from the parent repository if it has a prefix
git checkout develop
git fetch upsteam
git merge --ff-only upstream/develop
git push origin develop
git checkout <NEW_BRANCH_NAME>
git merge develop
```
5. **Local Test:** Run a clean build and test locally to ensure nothing was missed.
6. **Open PR:** Submit a Pull Request back to our public repository targeting `develop`.
7. **Code Review:** Maintainers will review the code for quality and standards.
8. **Local Verification:** Reviewers will pull down your branch (and any companion branches in other repos) to verify it builds and works as expected.
9. **Merge to `develop`:** Once approved, the PR is merged into `develop`.

From this point, the team takes over QA and release.

1. **Development Environment:** DevOps periodically redeploys our development environment so team members can test for regressions or unintended interactions. Any bugs found will be logged as new issues starting back at Step 1.

2. **Staging Environment:** When ready for a release cycle, vetted commits from `develop` are promoted into `release` and deployed to our staging environment for thorough QA testing. Minor issues found here are hotfixed directly in `release` and re-tested.

3. **Production Release:** Once staging passes QA, `release` is merged into `main`, DevOps deploys to production, and a newspost is published on the homepage detailing the update.

---

## Pull Request Etiquette

* **Complete the scope:** Ensure every requirement confirmed in the ticket is finished before marking your PR ready for review.
* **Clean build & smoke test:** Before submitting a PR, run a clean build to ensure there are zero errors, then log in and test your changes in-game. This prevents avoidable back-and-forth during review and QA.
* **Follow the template:** When you open a PR, the body is pre-filled with a template helping you accurately describe and link the PR to the relevant issue tickets and companion PRs. Please follow this template as it keeps issues from getting lost or desynced with development.
* **Submit multi-repo PRs together:** If your ticket spans multiple repositories, open all companion PRs at the same time. Once all PRs are opened, please make sure they are all cross-linked in the PR body as described in the template seen when opening the PR. **No PR for a multi-repo ticket will be merged until all companion PRs are approved or closed.**
* **Stay subscribed:** If a reviewer requests changes or clarification, they will leave comments on your PR. Make sure your GitHub notifications are enabled so you don't miss feedback.

---

## Testing

Every change goes through 4 stages of verification before reaching players on `main`:

1. **Developer Testing:** You verify your own changes locally during development and before opening a PR.
2. **Reviewer Verification:** During code review, reviewers pull down all branches tied to the ticket and verify the build and functionality locally.
3. **Dev Environment QA:** After merging into `develop`, QA testers verify the changes in the live development environment for ticket accuracy, compatibility with other active work, and historical accuracy.
4. **Staging Sign-Off:** Once promoted to `release`, the codebase undergoes a final production-emulative QA pass on the staging environment before merging into `main`.
