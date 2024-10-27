import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({
        unique: true,
        index: true
    })
    identification: string;

    @Prop()
    names: string;

    @Prop()
    lastNames: string;

    @Prop()
    telephone: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: true })
    status: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

