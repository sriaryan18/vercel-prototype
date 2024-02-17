export default function getUsernameFromRepo(repo:string){
    const repoParts = repo.split('/');
    if (repoParts.length >= 4 && repoParts[2] === 'github.com') {
        return repoParts[3];
    }
    return 'NO_USERNAME_DEFAULT'
}