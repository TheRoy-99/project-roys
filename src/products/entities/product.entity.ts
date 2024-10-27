import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    idClient: Types.ObjectId;

    @Prop({ required: true, unique: true })
    serial: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
