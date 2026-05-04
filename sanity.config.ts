import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
    name: 'default',
    title: 'Nikita Porwal - EduVista',
    projectId: '7fwra7kt',
    dataset: 'production',
    plugins: [structureTool()],
    schema: {
        types: [
            {
                name: 'pricingCategory',
                title: 'Pricing Category',
                type: 'document',
                fields: [
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'orderId', title: 'Order ID', type: 'string' },
                ],
            },
            {
                name: 'pricingPackage',
                title: 'Pricing Package',
                type: 'document',
                fields: [
                    { name: 'categoryId', title: 'Category ID', type: 'string' },
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'price', title: 'Price', type: 'number' },
                    { name: 'originalPrice', title: 'Original Price', type: 'number' },
                    { name: 'description', title: 'Description', type: 'string' },
                    { name: 'paymentButtonId', title: 'Payment Button ID', type: 'string' },
                    { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
                    { name: 'highlighted', title: 'Highlighted', type: 'boolean' },
                ],
            },
            {
                name: 'customPackage',
                title: 'Custom Package',
                type: 'document',
                fields: [
                    { name: 'id', title: 'ID', type: 'string' },
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'price', title: 'Price', type: 'number' },
                    { name: 'description', title: 'Description', type: 'text' },
                    { name: 'orderId', title: 'Order', type: 'number' },
                    { name: 'image', title: 'Image', type: 'image' },
                ],
            },
            {
                name: 'review',
                title: 'Review',
                type: 'document',
                fields: [
                    { name: 'reviewerName', title: 'Reviewer Name', type: 'string' },
                    { name: 'affiliation', title: 'Affiliation', type: 'string' },
                    { name: 'rating', title: 'Rating', type: 'number' },
                    { name: 'quote', title: 'Quote', type: 'text' },
                    { name: 'isVisible', title: 'Is Visible', type: 'boolean' },
                ],
            },
            {
                name: 'blog',
                title: 'Blog',
                type: 'document',
                fields: [
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
                    { name: 'summary', title: 'Summary', type: 'text' },
                    { name: 'body', title: 'Body', type: 'text' },
                    { name: 'status', title: 'Status', type: 'string' },
                    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
                    { name: 'coverImageUrl', title: 'Cover Image URL', type: 'url' },
                ],
            },
        ],
    },
})
