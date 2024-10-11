chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

const TEST_RULE_ID = 1;

chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
        {
            id: TEST_RULE_ID,
            action: {
                type: 'redirect',
                redirect: {
                    extensionPath: '/web-accessible-resources/redirects/noopmp4.mp4',
                },
            },
            condition: {
                urlFilter: '||audio-ak*-spotify-com.akamaized.net/audio/',
                resourceTypes: [
                    'media',
                ],
            },
            priority: 1301,
        },
    ],
    removeRuleIds: [TEST_RULE_ID],
});
