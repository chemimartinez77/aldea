import { supabase } from '../../pages/api/supabaseClient'

const addUser = async (email, name) => {
    const { data, error } = await supabase
        .from('users')
        .insert([
            { email, name }
        ])
    
    if (error) console.log('Error:', error)
    else console.log('User added:', data)
}

addUser('test@example.com', 'Test User')
function page() {
  return (
    <div>Datos usuario</div>
  )
}

export default page