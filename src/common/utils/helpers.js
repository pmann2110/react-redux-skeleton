import moment from 'moment';

/**
 *
 * Exit fullscreen function
 *
 */
export const exitFullscreen = (document) => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

/**
 * Return a javascript object containing the URL parameters
 * Read a page's GET URL variables and return them as an associative array.
 */
export const getUrlVars = () => {
  const vars = {};
  let hash;
  const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (const ha of hashes) {
    hash = ha.split('=');
    vars[hash[0]] = hash[1];
  }

  return vars;
};

/**
 * Expand fullscreen
 */
export const expandFullscreen = (document) => {
  // If screen has already been fullscreen then return
  if (window.innerHeight === screen.height) {
    return;
  }
  // Otherwise request fullscreen
  const el = document.documentElement;
  const rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen;

  rfs.call(el);
};

/**
 * Format member name as "Fist name concat with initial character of Last name"
 * Ex: John Cornor => John C
 * @param {string} firstName Specify the first name of member
 * @param {string} lastName Specify the last name of member
 */
export const formatMemberName = (firstName, lastName) => {
  if (!firstName) {
    return undefined;
  }

  // Trim name before concatination
  if (lastName) {
    lastName = `${lastName}`.trim();
  }

  return `${firstName.trim()} ${`${lastName || ''}`.charAt(0).toUpperCase()}.`;
};

/**
 * Render email to following format    Emi*****@xxx.com
 * @param {String} email The email need format
 */
export const renderEmail = (email) => {
  if (!email) {
    return undefined;
  }

  const arrs = email.split('@');
  const hash = arrs[0].substring(arrs[0].length - 6, arrs[0].length - 2);

  return email.replace(hash, '**');
};

/**
 * Converts the given date with the format pattern
 * @param {String}  date The date to be converted
 * @param {String}  format The format pattern to be used
 * @param {boolean} ignoreConvert
 * @return {String} The formatted date
 */
export const formatDate = (date, format, ignoreConvert = false) => {
  if (date === null || date === '') {
    return '';
  }

  // Remove Z character from the date value to ignore convert to local time
  if (ignoreConvert && typeof date === 'string') {
    date = date.replace(new RegExp('Z', 'g'), '');
  }
  // TBD
  // return moment(date).format('LT');
  if (format) {
    return moment(date).format(format);
  }
  return moment(date).format('h:mm A');
};

export const updateLocalStorage = (key, value, type = 'string') => {
  if (type === 'array') {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    if (!list.includes(value)) {
      list.push(value);
      localStorage.setItem(key, JSON.stringify(list));
    }
  } else {
    localStorage.setItem(key, value);
  }
};

/**
 * Get query route param
 * @param {string} url
 * @param {string} key
 * @returns {string | null}
 */
export const getQueryParam = (url, key) => {
  const params = new URLSearchParams(url);
  return params.get(key);
};

/**
 * Persisted state from storage
 * @returns {any}
 */
export const loadAppState = () => {
  try {
    const serializedState = localStorage.getItem('app_state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

/**
 * Save App state into browser storage
 * @param state
 */
export const saveAppState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('app_state', serializedState);
  } catch (error) {
    // Ignore
  }
};

/**
 * Create uuid
 */
export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${
    s4()}-${s4()}${s4()}${s4()}`;
};

export default {
  exitFullscreen,
  getQueryParam,
  updateLocalStorage,
  formatDate,
  renderEmail,
  formatMemberName,
  expandFullscreen,
  getUrlVars,
  loadAppState,
  saveAppState,
  guid
};
