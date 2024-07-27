export namespace ChatModels {
    export namespace Request {
        export interface List {
            user_id: string;
        }

        export interface Send {
            user_agent: string;
            thread_id: string;
            user_id: string;
            message: string;
            location: {
                lat: number;
                lng: number;
            };
        }
    }

    export namespace Response {
        export interface List {
            id: string;
            threadId?: string;
            timestamps: string;
            is_active: boolean;
        }

        export interface Detail {
            attachment?: string[];
            id: string;
            role: 'user' | 'assistant';
            message: string;
            messageId: string;
        }

        export interface Attachment {
            id: string;
            type: string;
            data: {
                placeId: string;
                placeName: string;
                priceLevel?: string;
                rating?: number;
                userRatingCount?: number;
                primaryType: string;
                photosUri?: string;
            };
        }
    }
}
