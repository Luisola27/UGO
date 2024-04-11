export async function loadConfig() {
    return(await fetch("site_config.json")).json();
}

export async function getWebSiteAPI() {
    const configJson = await loadConfig();

    return configJson.webSiteAPI;
}