# GitHub Branch Protection Rules

**Date:** 09/11/2026
**Repo:** `avj2352/manna_group_intl_2024`
**Branch:** `master`

## Overview

Branch protection rules have been configured on `master` to enforce a pull request workflow now that there are multiple collaborators on the repo.

## Collaborators

| GitHub Username | Role |
|----------------|------|
| `avj2352` | Owner / Admin |
| `JEROMEMATHEWS` | Collaborator |
| `emmanoleye` | Collaborator |

## Branch Protection Rules

| Rule | Setting |
|------|---------|
| Direct push to master | Blocked (PR required) |
| Required approving reviews | 1 |
| Dismiss stale reviews | Yes (new pushes invalidate old approvals) |
| Enforce for admins | No (`avj2352` can bypass as repo owner) |
| Force pushes | Blocked |
| Branch deletion | Blocked |

## How It Works

- **Collaborators** (`JEROMEMATHEWS`, `emmanoleye`) must open a PR and get it reviewed by someone else before merging to `master`. Self-approvals are not sufficient.
- **Owner** (`avj2352`) can self-approve and merge PRs since `enforce_admins` is disabled — admin privileges bypass the review requirement.
- If new commits are pushed to a PR after a review approval, the approval is **dismissed** and a new review is required.

## Prerequisites

- Repo visibility was changed from **private** to **public** to enable branch protection on the GitHub Free plan.

## Modifying Rules

To update branch protection via the `gh` CLI:

```bash
gh api repos/avj2352/manna_group_intl_2024/branches/master/protection -X PUT \
  --input - <<'EOF'
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 1
  },
  "restrictions": null
}
EOF
```

To view current rules:

```bash
gh api repos/avj2352/manna_group_intl_2024/branches/master/protection
```
