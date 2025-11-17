export function getCldImageUrl(publicId: string, options?: {
    width?: number
    height?: number
    crop?: string
    quality?: string | number
}) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const { width, height, crop = 'fill', quality = 'auto' } = options || {}
    
    let transformations = `q_${quality}`
    
    if (width) transformations += `,w_${width}`
    if (height) transformations += `,h_${height}`
    if (crop) transformations += `,c_${crop}`
    
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`
}

// Usage example:
// getCldImageUrl('evently/birthday-bash', { width: 400, height: 400 })