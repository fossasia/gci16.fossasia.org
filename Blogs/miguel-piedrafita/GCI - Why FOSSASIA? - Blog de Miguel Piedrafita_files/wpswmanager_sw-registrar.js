(function (global) {

  if (global.$swRegistrations) {
    return;
  }

  global.$swRegistrations = {};

  if ('serviceWorker' in navigator) {
    var enabledSw = [{"scope":"\/","url":"\/wp-admin\/admin-ajax.php?action=wpswmgr_serve&_wpswmanager=wpswmanager%2Fsw%2Fsw%40%2F"}];
    enabledSw.forEach(function(entry) {
      var scope = entry.scope;
      var swUrl = entry.url;
      global.$swRegistrations[scope] = navigator.serviceWorker.register(swUrl, { scope: scope });
    });
  }

})(window);
