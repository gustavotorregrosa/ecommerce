import { IUser } from "@/store/user/user.interface";
import { Avatar, CardHeader, Container, IconButton } from "@mui/material"
import Card from '@mui/material/Card';

export const LoginOptions = () => {

    const users: IUser[] = [
        {
            id: '1',
            email: 'dina@gmail.com',
            image: 'dina.png',
            name: 'Dina Fox',
            access_refresh_token: '123',
            access_token: '123'
        },

        {
            id: '2',
            email: 'amy@gmail.com',
            image: 'amy.png',
            name: 'Amy Sosa',
            access_refresh_token: '123',
            access_token: '123'
        }
    ]

    return <Container>
        <div className='flex items-center justify-center flex-wrap '>
                {users.map(user => <Card className="m-5 max-w-128 hover:cursor-pointer" >
                    <CardHeader
                        avatar={<Avatar aria-label={user.name} src={`/images/users/${user.image}`}></Avatar>}
                        title={user.name}
                        subheader={user.email}
                    />
                </Card> )}
        </div>
    </Container>
}