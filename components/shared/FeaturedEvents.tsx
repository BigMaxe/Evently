'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import techSummit from '@/public/images/fe-img1.jpg'
import musicConcert from '@/public/images/fe-img2.jpg'
import artExpo from '@/public/images/fe-img3.jpg'
import foodFest from '@/public/images/fe-img4.jpg'
import fashionShow from '@/public/images/fe-img5.jpg'

const events = [
    {
        id: 1,
        title: 'Tech Summer Summit 2025',
        date: '10/20/2025',
        image: techSummit,
        slug: 'tech-summer-summit-2025',
    }
]
