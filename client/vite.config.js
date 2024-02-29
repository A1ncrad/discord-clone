import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'

export default({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    

    
    return defineConfig({
        plugins: [react()],
        server: {
            https: {
                cert: fs.readFileSync(process.env.VITE_SERVER_CERT),
                key:  fs.readFileSync(process.env.VITE_SERVER_KEY)
            }}
    })
}
