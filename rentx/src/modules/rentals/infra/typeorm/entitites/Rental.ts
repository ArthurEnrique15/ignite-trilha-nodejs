// import {
//     Column,
//     CreateDateColumn,
//     Entity,
//     JoinColumn,
//     JoinTable,
//     ManyToMany,
//     ManyToOne,
//     PrimaryColumn,
// } from "typeorm";
import { v4 as uuidV4 } from "uuid";

// @Entity("cars")
class Rental {
    // @PrimaryColumn()
    id: string;

    // @Column()
    car_id: string;

    // @Column()
    user_id: string;

    // @Column()
    start_date: Date;

    // @Column()
    end_date: Date;

    // @Column()
    expected_return_date: Date;

    // @Column()
    fine_amount: number;

    // @CreateDateColumn()
    created_at: Date;

    // @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Rental };
