import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
@Entity('refresh-token')
export class RefreshTokenEntity {
  @PrimaryColumn('character', { length: 21 })
  token: string;
  @Column('timestamp without time zone')
  expiry: Date;
  @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
  user: UserEntity;
  @Column('integer')
  userId: number;
  @Column('text')
  deviceId: string;
}
