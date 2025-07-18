! Title: say/better.workflow
! Description: tiny improvements
! Version: 0.0.80
! Time Updated: 2025-07-10T17:24:33.934Z
! Expires: 2 hours
! License: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/deed)
! Author: Slava Leleka
!
! Add Link: https://raw.githubusercontent.com/slavaleleka/webweb/master/dist/say/better.workflow
! Subscribe Link: https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/dist/say/better.workflow
!
!
! GITHUB:
!
! labels
github.com#$#div[role="group"][aria-label="Issues"] div[id^="issue_"] > div[class] > div[class] > a[id^="issue_"] + span.d-block { position: absolute!important; right: 12em!important; top: 2.4em!important; }
! issue search
github.com#$?#.repository-content > div:not([style]) > div[class]:has(> div[role="search"])  { margin-bottom: 4px!important; }
github.com#$?#.repository-content > div:not([style]) > div.Box { margin-top: 4px!important; }
!
github.com#$#.repository-content > div[class] { margin-top: 4px!important; }
github.com#$#.file-navigation { margin-bottom: 4px!important; }
github.com#$#.Box-header { padding-top: 8px!important; }
github.com#$#.Box-header { padding-bottom: 8px!important; }
github.com#$#.gh-header-meta { margin-bottom: 4px!important; }
github.com#$#.gh-header-meta { padding-bottom: 0!important; }
github.com#$#.TimelineItem { padding: 8px 0!important; }
!
github.com##signup-prompt-controller
github.com#$#header { padding-top: 8px!important; }
github.com#$#header { padding-bottom: 8px!important; }
github.com#$#main > .hide-full-screen { padding-top: 8px!important; margin-bottom: 0!important; }
github.com#$#main > .hide-full-screen > div[class] { margin-bottom: 0!important; }
github.com#$##partial-discussion-header { margin: 0!important; }
!
!
! JIRA:
!
#$#.version-filter-status-text { margin-left: 140px !important; }
!
#$#.ajs-layer { min-width: 300px !important; }
!
#$##gh > div#ghx-header { padding: 5px 20px !important; }
#$##js-work-quickfilters > dd { margin-bottom: 2px! important; }
#$#ul#ghx-column-headers > { padding: 5px 9px !important; }
#$#input#quickSearchInput.search { background: none!important; border: 1px solid black!important; }
!
#$#section#create-issue-dialog.aui-dialog2 { top: 10px !important; }
#$#section#create-issue-dialog.aui-dialog2 .aui-dialog2-content { min-height: 750px !important; }
#$#section#edit-issue-dialog.aui-dialog2 { top: 10px !important; min-height: 800px !important; }
#$#section#edit-issue-dialog.aui-dialog2 .aui-dialog2-content { max-height: 100% !important; }
#$#section#create-subtask-dialog { top: 10px !important; min-height: 750px !important; }
#$#section#new-dialog-id { top: 10px !important; min-height: 750px !important; }
#$#.aui-dialog2-header { height: 50px !important; }
#$#.aui-dialog2-content { min-height: 650px !important; }
#$#.aui-dialog2-content #description-wiki-edit > textarea[name="description"] { max-height: 550px !important; }
#$#.aui-dialog2-content .qf-field { padding: 2px 30px 2px 0 !important; }
!
!
!
! BITBUCKET:
!
#$#.comment .comment-actions { margin-top: 4px!important; }
#$#.comment > .comment-wrapper { padding-top: 0!important; padding-bottom: 0!important; }
!
#$#.pull-request-details { margin-bottom: 0px!important; }
#$#.pull-request-activities { margin-top: 0!important; }
#$#.pull-request-title-review-section { margin-top: 5px!important; }
#$#h2.pull-request-title { margin-bottom: 2px!important; }
#$#.pull-request-header-bar { height: 20px!important; }
#$#.pull-request-tabs .tabs-pane { padding-top: 5px!important; }
#$#.aui-page-panel-content { padding-top: 8px!important; }
##.dashboard-empty-reviewing > svg
#$#.empty-state { margin: 0!important; }
##.empty-state .dashboard-empty-description
#$#.pull-request-title-review-section .pull-request-title { margin: 0 !important; }
#$#.change-view .change-header { padding: 2px 8px 2px 24px !important; }
#$#.pull-request-tabs .tabs-pane[role="tabpanel"] { padding: 2px !important; }
!
#$##dashboard-container > .main-panel { padding-top: 0!important; }
#$##dashboard-container > .side-panel > .dashboard-repositories-section { padding-top: 4px!important; }
#$#.side-panel .dashboard-recent-repositories { margin-top: 8px!important; }
#$#.side-panel ol.dashboard-repositories-list > li > a { padding-top: 0!important; padding-bottom: 0!important; }
!
! create jira issue from the bitbucket task
#$##select2-drop > ul.select2-results { max-height: 280px !important }
!
@@||agrd.dev^$domain=agrd.dev
!
! bitbucket — new rules to observe
#$#nav.aui-header { padding-top: 0 !important; }
#$##dashboard-container .main-section { margin-top: 4px !important; }
#?##dashboard-container > .main-panel > h1:contains(Your work)
!
! bitbucket — jira issues
agrd.dev###dashboard-container .dashboard-jira-issues
! create jira issue from the bitbucket task
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Story Points))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Epic Link))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Checklist))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Attachment))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(External issue ID))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Upvotes))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Due Date))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Fix Version/s))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Linked Issues))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Labels))
! #?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Priority))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Time Tracking))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Log Work))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Sprint))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Team))
#?#form.jira-interation-create-issue-form.jira-create-form .jira-field:has(label:contains(Original story points))
!
!
!
! BAMBOO:
!
! builds queue
#$?#.buildInfo a:contains(AdGuard JS Libraries › ) { background-color: khaki !important; }
#$?#.buildInfo a:contains(AdGuard Extensions › browser extension) { background-color: #f6cf1e !important; }
