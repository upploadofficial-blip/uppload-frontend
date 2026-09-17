// auth.js — shared login system used by every page.
// When someone signs in on ONE page, this remembers it (in the browser's
// localStorage) so every other page in the app already knows who they are —
// exactly like real YouTube, where you don't have to sign in again on every screen.

const Auth = {
  saveSession(token, user) {
    localStorage.setItem('uppload_token', token);
    localStorage.setItem('uppload_user', JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem('uppload_token');
  },

  getUser() {
    const raw = localStorage.getItem('uppload_user');
    return raw ? JSON.parse(raw) : null;
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  signOut() {
    localStorage.removeItem('uppload_token');
    localStorage.removeItem('uppload_user');
    window.location.href = 'index.html';
  },

  // Call this on every page to update the top-right of the nav bar:
  // shows "Sign In" if logged out, or the user's name + a Sign Out link if logged in.
  renderNavAuthState() {
    const nav = document.querySelector('.top-nav');
    if (!nav) return;
    const signInLink = nav.querySelector('a[href="login.html"]');
    if (!signInLink) return;

    if (this.isLoggedIn()) {
      const user = this.getUser();
      signInLink.textContent = user ? user.channelName : 'Account';
      signInLink.removeAttribute('href');
      signInLink.style.cursor = 'pointer';
      signInLink.title = 'Click to sign out';
      signInLink.addEventListener('click', () => {
        if (confirm('Sign out of UppLoad?')) this.signOut();
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Auth.renderNavAuthState());
