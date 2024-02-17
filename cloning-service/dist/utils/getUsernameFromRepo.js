"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUsernameFromRepo(repo) {
    const repoParts = repo.split('/');
    if (repoParts.length >= 4 && repoParts[2] === 'github.com') {
        return repoParts[3];
    }
    return 'NO_USERNAME_DEFAULT';
}
exports.default = getUsernameFromRepo;
