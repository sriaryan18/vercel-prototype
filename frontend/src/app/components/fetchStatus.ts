'use client'
interface StatusPayload {
    hash: string;
    cb: (res: Response) => void;
}

export default async function checkStatus({ hash, cb }: StatusPayload): Promise<string> {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    let retryCount = 10; // be it a default value
    let res = await fetch(`${backendUrl}/status/${hash}`, {
        method: 'get',
    });
    const text = await res.clone().json()
    if (res.status === 200) {
        cb(text);
        return 'success';
    }
    while (retryCount--) {
        await new Promise(resolve => setTimeout(resolve, 6000));
        let res = await fetch(`${backendUrl}/status/${hash}`, {
            method: 'get',
        });
        const text = await res.json()
        if (res.status === 200) {
            cb(text);
            return 'success';
        }

    }
    return 'failed';
}
