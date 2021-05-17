import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Personne } from './personne/personne.entity';
import { User } from './users/users.entity';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'login_nest',
  entities: [Personne, User],
  synchronize: true,
};

export default ormconfig;
