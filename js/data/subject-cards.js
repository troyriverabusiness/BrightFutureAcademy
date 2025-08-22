// Subject Data Configuration
// This file contains all subject information for the academy
// Update this file to modify subject details across all pages

const subjectData = [
    // Mathematics
    {
        id: 'math-ai-hl',
        name: 'Math Application and Interpretation HL',
        description: 'The class tackles all HL and SL topics of the Math AI curriculum. At HL, the SL subjects are taught and finished in the first year (Grade 11), and the HL subjects are explored in the second year (Grade 12). This math subject is less abstract and has more practical topics in comparison to Math AA. Potential fields where this math is useful are: Finance, Economics, Computer Science, and more.',
        price: '280€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'mathAIHL.html',
        category: 'Mathematics',
        gdc: 'Required',
        duration: '2 years',
        image: 'math_ai_hl.webp'
    },
    {
        id: 'math-ai-sl',
        name: 'Math Application and Interpretation SL',
        description: 'Standard Level Math AI focuses on practical applications of mathematics. Students learn mathematical concepts through real-world problems and applications, making it ideal for students interested in business, social sciences, or other fields where practical math skills are valuable.',
        price: '250€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'mathAISL.html',
        category: 'Mathematics',
        gdc: 'Required',
        duration: '2 years',
        image: 'math_ai_sl.webp'
    },
    {
        id: 'math-aa-hl',
        name: 'Math Analysis and Approaches HL',
        description: 'Higher Level Math AA is designed for students who enjoy mathematics and want to develop strong analytical and problem-solving skills. This course is more abstract and theoretical, perfect for students planning to study mathematics, physics, engineering, or other STEM fields at university.',
        price: '280€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'mathAAHL.html',
        category: 'Mathematics',
        gdc: 'Required',
        duration: '2 years',
        image: 'math_aa_hl.webp'
    },
    {
        id: 'math-aa-sl',
        name: 'Math Analysis and Approaches SL',
        description: 'Standard Level Math AA provides a solid foundation in mathematical analysis and approaches. Students develop logical thinking and mathematical reasoning skills through structured problem-solving and theoretical exploration.',
        price: '250€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'mathAASL.html',
        category: 'Mathematics',
        gdc: 'Required',
        duration: '2 years',
        image: 'math_aa_sl.webp'
    },
    
    // Physics
    {
        id: 'physics-hl',
        name: 'Physics HL',
        description: 'Higher Level Physics explores the fundamental principles of the physical world in depth. Students develop strong analytical skills and learn to apply mathematical concepts to understand complex physical phenomena. Ideal for students pursuing physics, engineering, or related fields.',
        price: '280€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'physicsHL.html',
        category: 'Physics',
        gdc: 'Required',
        duration: '2 years',
        image: 'physics_hl.webp'
    },
    {
        id: 'physics-sl',
        name: 'Physics SL',
        description: 'Standard Level Physics provides a comprehensive understanding of core physics concepts. Students learn through practical experiments and theoretical study, developing critical thinking and problem-solving skills essential for many university programs.',
        price: '250€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'physicsSL.html',
        category: 'Physics',
        gdc: 'Required',
        duration: '2 years',
        image: 'physics_sl.webp'
    },
    
    // Chemistry
    {
        id: 'chemistry-hl',
        name: 'Chemistry HL',
        description: 'Higher Level Chemistry delves deep into chemical principles and laboratory techniques. Students develop advanced analytical skills and gain hands-on experience with complex chemical processes. Perfect for students interested in chemistry, medicine, or chemical engineering.',
        price: '280€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'chemistryHL.html',
        category: 'Chemistry',
        gdc: 'Not required',
        duration: '2 years',
        image: 'chemistry_hl.webp'
    },
    {
        id: 'chemistry-sl',
        name: 'Chemistry SL',
        description: 'Standard Level Chemistry covers essential chemical concepts and laboratory skills. Students learn through practical experiments and theoretical study, building a strong foundation for further studies in science or related fields.',
        price: '250€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'chemistrySL.html',
        category: 'Chemistry',
        gdc: 'Not required',
        duration: '2 years',
        image: 'chemistry_sl.webp'
    },
    
    // Economics
    {
        id: 'economics-hl',
        name: 'Economics HL',
        description: 'Higher Level Economics provides an in-depth study of economic theory and real-world applications. Students analyze complex economic scenarios and develop strong analytical and critical thinking skills. Ideal for students interested in business, economics, or social sciences.',
        price: '250€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'economicsHL.html',
        category: 'Economics',
        gdc: 'Not required',
        duration: '2 years',
        image: 'economics_hl.webp'
    },
    {
        id: 'economics-sl',
        name: 'Economics SL',
        description: 'Standard Level Economics introduces fundamental economic concepts and principles. Students learn to analyze economic situations and develop an understanding of how markets and economies function in the real world.',
        price: '220€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'economicsSL.html',
        category: 'Economics',
        gdc: 'Not required',
        duration: '2 years',
        image: 'economics_sl.webp'
    },
    
    // Business Management
    {
        id: 'business-hl',
        name: 'Business Management HL',
        description: 'Higher Level Business Management explores complex business concepts and strategies. Students develop strong analytical and decision-making skills through case studies and real-world business scenarios. Perfect for future entrepreneurs and business leaders.',
        price: '250€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'businessHL.html',
        category: 'Business',
        gdc: 'Not required',
        duration: '2 years',
        image: 'business_hl.webp'
    },
    {
        id: 'business-sl',
        name: 'Business Management SL',
        description: 'Standard Level Business Management provides a solid foundation in business principles and practices. Students learn about various business functions and develop practical skills for understanding and analyzing business operations.',
        price: '220€',
        grade: 'Grade 11',
        type: 'In-person',
        link: 'businessSL.html',
        category: 'Business',
        gdc: 'Not required',
        duration: '2 years',
        image: 'business_sl.webp'
    }
];


// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { subjectData, getSubjectsByCategory, getSubjectById, getAllSubjects };
}
