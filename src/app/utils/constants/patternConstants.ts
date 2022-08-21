export const PatternConstants = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    businessEmail: /^(?!.+@(yahoo|hotmail|aol|hotmail|hotmail|msn|yahoo|wanadoo|orange|comcast|yahoo|yahoo|yahoo|live|rediffmail|free|gmx|web|yandex|ymail|libero|outlook|uol|bol|mail|cox|hotmail|sbcglobal|sfr|live|verizon|live|googlemail|yahoo|ig|live|bigpond|terra|yahoo|neuf|yahoo|alice|rocketmail|att|laposte|facebook|bellsouth|yahoo|hotmail|charter|yahoo|yahoo|rambler|hotmail|tiscali|shaw|yahoo|sky|earthlink|optonline|freenet|t-online|aliceadsl|virgilio|home|qq|telenet|me|yahoo|tiscali|yahoo|voila|gmx|mail|planet|tin|live|ntlworld|arcor|yahoo|frontiernet|hetnet|live|yahoo|zonnet|club-internet|juno|optusnet|blueyonder|bluewin|skynet|sympatico|windstream|mac|centurytel|chello|live|aim|bigpond|gmail)\..+)(.+@.+\..+)$/,
    leiNumber: /^[a-zA-Z0-9]{20}$/,
    website: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};
