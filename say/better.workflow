! Title: /say/better.workflow
! Description: tiny improvements
! Version: 0.0.28
! Expires: 2 hours
! TimeUpdated: 2024-09-02T13:00:00+03:00
! License: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/deed)
!
! to add: https://raw.githubusercontent.com/slavaleleka/webweb/master/say/better.workflow
! to subscribe: https://subscribe.adblockplus.org?location=https://raw.githubusercontent.com/slavaleleka/webweb/master/say/better.workflow
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
#$#section#create-issue-dialog { top: 10px !important; min-height: 750px !important; }
#$#section#edit-issue-dialog { top: 10px !important; min-height: 750px !important; }
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
!
#$##dashboard-container > .main-panel { padding-top: 0!important; }
#$##dashboard-container > .side-panel > .dashboard-repositories-section { padding-top: 4px!important; }
#$#.side-panel .dashboard-recent-repositories { margin-top: 8px!important; }
#$#.side-panel ol.dashboard-repositories-list > li > a { padding-top: 0!important; padding-bottom: 0!important; }
!
! create jira issue from the bitbucket task
#$##select2-drop > ul.select2-results { max-height: 280px !important }
!
@@||bit.int.agrd.dev^$domain=bit.int.agrd.dev
!
!
!
! BAMBOO:
!
! builds queue
#$?#.buildInfo a:contains(AdGuard JS Libraries › ) { background-color: khaki !important; }
