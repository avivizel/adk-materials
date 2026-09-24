terraform {
  required_version = ">= 1.6.0"

  required_providers {
    cursor = {
      source  = "cursor/cursor"
      version = ">= 0.1.0"
    }
  }
}

provider "cursor" {}

resource "cursor_platform_workflow" "pqc_instruction_paper" {
  name        = "PQC regulated instruction paper"
  description = "Every two weeks, scan the PQC source catalog and rewrite docs/pqc-regulated-instructions.md."
  scope       = "user"
  enabled     = true
  memory_enabled = true

  git_repo   = "github.com/avivizel/adk-materials"
  git_branch = "main"
  prompt     = file("${path.module}/../agent-prompt.md")

  trigger = [
    {
      cron = {
        # 08:00 UTC on the 1st and the 15th. Cron has no biweekly field;
        # these two dates are the every-two-weeks schedule.
        schedule = "0 8 1,15 * *"
      }
    }
  ]

  action = [
    {
      git_pr = {}
    },
    {
      mcp = {
        server = "Gmail"
      }
    }
  ]
}
