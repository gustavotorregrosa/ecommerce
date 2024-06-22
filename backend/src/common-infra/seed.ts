import { NestFactory } from "@nestjs/core"
import { exit } from "process"
import { User } from "src/@domain/user/domain"
import { UserService } from "src/@domain/user/service"
import { AppModule } from "src/app.module"

const toSeed = async () => {

    const app = await NestFactory.createApplicationContext(AppModule)
    const userService = app.get<UserService>(UserService)

    const usersList: User[] = [
        new User('Amy', 'amy@gmail.com', 'cloud9', 'amy.png'),
        new User('Jonah', 'jonah@gmail.com', 'cloud9', 'jonah.png'),
        new User('Cheyenne', 'cheyenne@gmail.com', 'cloud9', 'cheyenne.png'),
        new User('Dina', 'dina@gmail.com', 'cloud9', 'dina.png'),
        new User('Glenn', 'glenn@gmail.com', 'cloud9', 'glenn.png'),
        new User('Garret', 'garret@gmail.com', 'cloud9', 'garret.png'),
        new User('Mateo', 'mateo@gmail.com', 'cloud9', 'mateo.png'),
    ]

    await Promise.all(usersList.map(user => userService.insert(user)))
    exit()
}

toSeed()