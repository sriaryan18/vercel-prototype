'use client'

const sendRepoUrl = async (data: FormDataEntryValue | null) => {
    const backendUrl =process.env.NEXT_PUBLIC_BACKEDN_URL || 'http://localhost:3001';
      const res:any = await fetch(`${backendUrl}/deploy`, {
       method: 'post',
          headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({repoUrl: data}),
        cache:'no-cache'
   });
      const result = await res.json();
      return result?.id;
}
export  default  sendRepoUrl;