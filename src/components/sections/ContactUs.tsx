"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/Icons";
import { Button } from "../ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { File, FileWarning, Upload } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  fullName: z.string().min(1, "First name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Please select a department"),
  comment: z.string().min(1, "Comment is required"),
  attachment: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const STYLES = {
  colors: {
    gradientBackground:
      "linear-gradient(266.49deg, #F99639 -15.12%, #D80A00 58.77%, #A01800 118.54%)",
    formBackground: "#fdfcfc",
    textPrimary: "#000",
    textSecondary: "#f9f7f7",
    textWhite: "#fdfcfc",
    borderDefault: "#716B6B",
    borderActive: "#171515",
    borderError: "#B50F0F",
  },
  spacing: {
    containerPadding: {
      desktop:
        "lg:px-[56px] lg:py-[55px] 3xl:py-[60px] md:px-[31px] md:py-[40px] px-[16px] py-[25px]",
      form: "pt-[24px] pl-[34px] pr-[34px]",
    },
  },
} as const;

interface FormFieldProps {
  type: "text" | "tel" | "email" | "textarea" | "select";
  name: keyof FormData;
  placeholder: string;
  register: any;
  error?: string;
  rows?: number;
  options?: string[];
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  name,
  placeholder,
  register,
  error,
  rows = 4,
  options = [],
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const getBorderColor = () => {
    if (error) return STYLES.colors.borderError;
    if (isFocused || open) return STYLES.colors.borderActive;
    return STYLES.colors.borderDefault;
  };

  const getTextColor = () => {
    if (error) return STYLES.colors.borderError;
    if (isFocused || open || selected) return STYLES.colors.textPrimary;
    return STYLES.colors.borderDefault;
  };

  const commonClasses = `
    w-full bg-transparent border-0 border-b-[1px] pb-3 pt-2
    focus:outline-none transition-colors duration-300
  `;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9+\-\s()]/g, "");
    return e;
  };

  // 🧩 Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🟢 Custom Dropdown
  if (type === "select") {
    const handleSelect = (value: string) => {
      setSelected(value);
      setOpen(false);
      register(name).onChange({
        target: { name, value },
      });
    };

    return (
      <div className="relative custom-dropdown" ref={dropdownRef}>
        <div
          className={`${commonClasses} cursor-pointer flex items-center justify-between`}
          style={{
            borderBottomColor: getBorderColor(),
            color: selected ? getTextColor() : "#716b6b",
          }}
          onClick={() => setOpen(!open)}
        >
          <span>{selected || placeholder}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {open && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-md z-50 max-h-[160px] overflow-y-auto">
            {options.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(opt)}
                className={`px-[10px] py-2 cursor-pointer hover:bg-gray-100 ${selected === opt ? "bg-gray-100 font-medium" : ""
                  }`}
              >
                {opt}
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-1 text-[#B50F0F] font-normal text-sm leading-[140%] tracking-[-0.01em] align-middle">
            {error}
          </p>
        )}
      </div>
    );
  }

  // 🟢 Textarea
  if (type === "textarea") {
    return (
      <div className="relative">
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={rows}
          className={`${commonClasses} resize-none ${name === "comment" ? "lg:h-26 md:h-[105px] xs:h-[106px]" : ""
            }`}
          style={{
            borderBottomColor: getBorderColor(),
            color: getTextColor(),
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <style jsx>{`
          textarea::placeholder {
            color: #716b6b;
          }
        `}</style>
        {error && (
          <p className="mt-1 text-[#B50F0F] font-normal text-sm leading-[140%] tracking-[-0.01em] align-middle">
            {error}
          </p>
        )}
      </div>
    );
  }

  // 🟢 Default Input
  return (
    <div className="relative">
      <input
        {...register(name, {
          onChange: type === "tel" ? handlePhoneInput : undefined,
        })}
        type={type}
        placeholder={placeholder}
        className={commonClasses}
        style={{
          borderBottomColor: getBorderColor(),
          color: getTextColor(),
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <style jsx>{`
        input::placeholder {
          color: #716b6b;
        }
      `}</style>
      {error && (
        <p className="mt-1 text-[#B50F0F] font-normal text-sm leading-[140%] tracking-[-0.01em] align-middle">
          {error}
        </p>
      )}
    </div>
  );
};


const ContactInfo: React.FC<{ layout: "desktop" | "tablet" | "mobile" }> = ({
  layout,
}) => {
  const isDesktop = layout === "desktop";
  const isTablet = layout === "tablet";
  const isMobile = layout === "mobile";

  const titleClass = isDesktop
    ? "2xl:text-[22px] font-bold mb-[22px] 3xl:mb-[20px] leading-[110%]"
    : isTablet
      ? "text-[22px] font-bold  mb-[30px]"
      : "text-[18px] font-bold mb-[8px]";

  const textClass = isDesktop
    ? "text-[16px]"
    : isTablet
      ? "text-sm"
      : "text-sm";

  const spacingClass = isDesktop
    ? "space-y-1"
    : isTablet
      ? "space-y-1"
      : "space-y-0 text-[16px] font-normal leading-[140%]";

  return (
    <div className="relative lg:w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white">

        <div className="grid grid-cols-2 md:grid-cols-1 gap-x-5 w-full space-y-[20px] lg:space-y-[40px]">
          <div className="space-y-1">
            <div className="text-[rgba(237,235,235,0.7)] md:font-medium text-[16px] md:text-[22px] leading-[110%]">
              Phone Number:
            </div>
            <div className="md:text-[18px] leading-[150%] md:font-medium tracking-[-0.2px]">
              +48 22 490 80 00
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[rgba(237,235,235,0.7)] md:font-medium md:text-[22px] leading-[110%]">
              Fax:
            </div>
            <div className="md:text-[18px] leading-[150%] md:font-medium tracking-[-0.2px]">
              +48 22 490 80 01
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[rgba(237,235,235,0.7)] md:font-medium md:text-[22px] leading-[110%]">
              Email:
            </div>
            <div className="md:text-[18px] break-all md:break-normal leading-[150%] md:font-medium tracking-[-0.2px]">
              warsaw@danskegas.com
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[rgba(237,235,235,0.7)] md:font-medium md:text-[22px] leading-[110%]">
              Web-site:
            </div>
            <div className="md:text-[18px] break-all md:break-normal leading-[150%] fmd:ont-medium tracking-[-0.2px]">
              www.danskegas.com
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-x-5 w-full space-y-[21px] lg:space-y-11">
          <div className="space-y-1 hidden md:block">
            <div className="text-[rgba(237,235,235,0.7)] md:font-medium md:text-[22px] leading-[110%]">
              Address:
            </div>
            <div className="lg:max-w-[240px] md:text-[18px] leading-[150%] md:font-medium tracking-[-0.2px]">
              Danske Gas S. A., ul. Słomińskiego 7, lok. 215, 00-195 Warszawa, Poland
            </div>
          </div>
          <div className="space-y-1">
            <div className="md:text-[18px] leading-[150%] md:font-medium">
              <span className="text-[rgba(237,235,235,0.7)]">
                VAT:
              </span>
              <span className="tracking-[-0.2px] pl-1">
                PL 525-283-81-36,
              </span>
            </div>
            <div className="md:text-[18px] leading-[150%] md:font-medium">
              <span className="text-[rgba(237,235,235,0.7)]">
                REGON:
              </span>
              <span className="tracking-[-0.2px] pl-1">
                387197468
              </span>
            </div>
            <div className="md:text-[18px] leading-[150%] md:font-medium">
              <span className="text-[rgba(237,235,235,0.7)]">
                KRS:
              </span>
              <span className="tracking-[-0.2px] pl-1">
                0000861970
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[rgba(237,235,235,0.7)] md:font-medium md:text-[22px] leading-[110%]">
              Paid up capital:
            </div>
            <div className="max-w-[240px] md:text-[18px] leading-[150%] md:font-medium tracking-[-0.2px]">
              20.000.000,00 PLN
            </div>
          </div>
          <div className="space-y-1 block md:hidden">
            <div className="text-[rgba(237,235,235,0.7)] md:font-medium md:text-[22px] leading-[110%]">
              Address:
            </div>
            <div className="lg:max-w-[240px] md:text-[18px] leading-[150%] md:font-medium tracking-[-0.2px]">
              Danske Gas S. A., ul. Słomińskiego 7, lok. 215, 00-195 Warszawa, Poland
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactForm: React.FC<{
  layout: "desktop" | "tablet" | "mobile";
  careerPage?: boolean;
}> = ({ layout, careerPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    setFocus
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const formRef = useRef<HTMLDivElement | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [attachmentError, setAttachmentError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!formRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setFocus("fullName"); // 👈 focus every time form is visible
        }
      },
      { threshold: 0.5 } // adjust: 0.5 = 50% visible
    );

    observer.observe(formRef.current);

    return () => observer.disconnect();
  }, [setFocus]);

  // file validation
  const validateAttachment = (file: File) => {
    const maxSize = 2 * 1024 * 1024;
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const unsupportedTypes = [
      "application/x-executable",
      "application/x-msdownload",
      "application/x-shockwave-flash",
      "video/x-msvideo",
      "audio/mpeg",
    ];

    if (file.size > maxSize) {
      setAttachmentError("File size must be less than 2 MB");
      return false;
    }

    if (
      unsupportedTypes.some(
        (type) =>
          file.type === type ||
          file.name.toLowerCase().match(/\.(exe|bat|scr|js|vbs|dll|com)$/)
      )
    ) {
      setAttachmentError(
        "Unsupported file type. Please use PDF, images, or documents."
      );
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setAttachmentError(
        "File type not supported. Please use common document formats."
      );
      return false;
    }

    return true;
  };

  const onSubmit = async (data: FormData) => {
    // Temporary: Skip reCAPTCHA for testing
    const skipRecaptcha = true;
    
    try {
      
      if (!skipRecaptcha && !recaptchaRef.current) {
        toast.error("reCAPTCHA not loaded");
        return;
      }
  
      if (attachment && !validateAttachment(attachment)) {
        return;
      }
  
      setIsSubmitting(true);
  
      // 🧩 Get reCAPTCHA token with proper error handling (skip if disabled)
      let token: string | null = null;
      if (!skipRecaptcha) {
        try {
          token = await recaptchaRef.current!.executeAsync();
          if (!token) {
            throw new Error("reCAPTCHA returned null token");
          }
        } catch (recaptchaError) {
          console.error("reCAPTCHA error:", recaptchaError);
          toast.error("reCAPTCHA verification failed. Please try again.");
          return;
        }
      } else {
        console.log("email sent");
      }
  
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("department", data.department);
      formData.append("contents", data.comment);
      
      // Only append reCAPTCHA token if not skipping
      if (!skipRecaptcha && token) {
        formData.append("recaptchaToken", token);
      }
  
      if (attachment) {
        formData.append("attachment", attachment);
      }
  
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });
  
      // 🧩 Check if response is okay before parsing
      if (!response.ok) {
        const text = await response.text();
        console.error("API Error Response:", text);
        toast.error("Failed to send email. Please try again later.");
        return;
      }
  
      // 🧩 Try to safely parse response JSON
      let result;
      try {
        result = await response.json();
      } catch (err) {
        const text = await response.text();
        console.error("Invalid JSON response:", text);
        toast.error("Unexpected server response. Please try again.");
        return;
      }
  
      // 🧩 Handle success or failure
      if (result?.success) {
        toast.success("Email sent successfully. We will contact you soon.");
        reset();
        setAttachment(null);
        setAttachmentError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(result?.message || "Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Client-side error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      if (!skipRecaptcha && recaptchaRef.current) recaptchaRef.current.reset();
    }
  };
  

  const isDesktop = layout === "desktop";
  const isTablet = layout === "tablet";
  const isMobile = layout === "mobile";

  const titleSize = isDesktop
    ? "lg:text-[40px] md:text-[32px] text-[30px] font-medium leading-[133%] tracking-tight"
    : isTablet
      ? "text-xl md:text-[28px] font-medium leading-[133%]"
      : "text-[28px] font-medium leading-[133%] ";

  const containerClass = isDesktop
    ? "rounded-[24px] h-full lg:pt-[24px] lg:px-[37px] lg:w-[572px] lg:ml-[11px]"
    : isTablet
      ? "rounded-[12px] py-[24px] px-[16px] lg:mt-0 md:mt-[3px]"
      : "rounded-[12px] px-[16px] py-[24px] xs:h-auto mt-[6px]";

  const formClass = isDesktop
    ? "2xl:pb-4 flex-1 flex flex-col 2xl:gap-5 3xl:mt-7 2xl:mt-[32px] 2xl:font-normal text-[16px] leading-[140%]"
    : "2xl:pb-4 flex-1 flex flex-col 2xl:gap-5 3xl:mt-7 2xl:mt-[26px] xs:mt-[20px] md:gap-5 2xl:font-normal text-[16px] leading-[140%] md:gap-0 xs:gap-5";

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      if (validateAttachment(file)) {
        setAttachment(file);
        setAttachmentError("");
      } else {
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      setIsUploading(false);
    }
  };

  return (
    <div ref={formRef}
      className={containerClass}
      style={{
        backgroundColor: STYLES.colors.formBackground,
        ...(isDesktop && {
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }),
      }}
    >
      <h3
        className={`${titleSize}`}
        style={{ color: STYLES.colors.textPrimary, letterSpacing: "0px" }}
      >
        {isDesktop ? (
          <>
            Leave your details and <br /> we will contact you
          </>
        ) : isTablet ? (
          <>Leave your details and we will contact you</>
        ) : isMobile ? (
          <>
            Leave your details
            <br />
            and we will contact you
          </>
        ) : (
          <>Leave your details and we will contact you</>
        )}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        <FormField
          type="text"
          name="fullName"
          placeholder="Enter your full name *"
          register={register}
          error={errors.fullName?.message}
        />

        <FormField
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          register={register}
          error={errors.phone?.message}
        />

        <FormField
          type="email"
          name="email"
          placeholder="Your email address *"
          register={register}
          error={errors.email?.message}
        />

        <FormField
          type="select"
          name="department"
          placeholder="Choose the department"
          register={register}
          error={errors.department?.message}
          options={[
            "LPG Department",
            "Heating Oil Department",
            "Traditional Fuels Department (Diesel & Gasoline)",
            "Racing Fuels Department",
            "Solid Fuels Department",
            "Electricity Department",
            "Technical Gases Department",
            "Chemicals Department",
            "Aviation Lubricants Department",
            "BIO Fuels Department",
          ]}
        />

        <div className={isDesktop ? "relative flex-1" : "relative"}>
          <FormField
            type="textarea"
            name="comment"
            placeholder="Leave Your Comment *"
            register={register}
            error={errors.comment?.message}
          />
        </div>

        {careerPage && (
          <div className="pt-[5px]">
            <div className="flex items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleAttachmentChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt,.xls,.xlsx"
                id="attachment"
              />
              <label
                htmlFor="attachment"
                className={`w-full inline-flex items-center justify-center px-4 py-[14px] border border-dashed rounded-[30px] text-[18px] leading-[140%] font-medium cursor-pointer transition-colors duration-300 ${isUploading ? " text-[#0057FF] border-[#0057FF]" : attachment ? "text-[#0E8914] border-[#0E8914]" : attachmentError ? "text-[#B50F0F] border-[#B50F0F]" : " text-[#716B6B] border-[#716B6B] hover:bg-gray-50"}`}
              >
                {isUploading ? (
                  <>
                    <Image
                      src="/loader.svg"
                      alt="loader"
                      height={22}
                      width={22}
                      className="w-4 h-4 mr-2 animate-spin"
                    />
                    {attachment?.name || "Uploading..."}
                  </>
                ) : attachment ? (
                  <>
                    <File className="w-6 h-6 mr-2" />
                    {attachment.name}
                  </>
                ) : attachmentError ? (
                  <>
                    <FileWarning className="w-6 h-6 mr-2" />
                    {attachmentError === "File size must be less than 2 MB"
                      ? "Max file size is 2MB. Try again"
                      : "Upload Failed. Try again"}
                  </>
                ) : (
                  <>
                    Attach your CV in pdf
                    <Upload className="w-4 h-4 ml-2" />
                  </>
                )}
              </label>
            </div>
          </div>
        )}

        <div
          className={
            isDesktop
              ? "mt-[20px] mb-[20px] 2xl:mb-0 2xl:mt-[31px]"
              : "lg:pt-6 md:pt-[16px] xs:pt-[14px]"
          }
        >
          <Button
            type="submit"
            variant="cta-gradient"
            className={`w-full ${isDesktop ? "mb-2" : "mt-6"
              } rounded-full h-[54px] w-full font-normal text-lg transition-all duration-300 flex items-center justify-center`}
            disabled={isSubmitting}
          >
            <span className="relative z-10">Submit Application</span>
            <Icons.UpRightArrowLight />
          </Button>
        </div>
        <ReCAPTCHA
          sitekey="6LeJ0fIrAAAAAAzv0TGeCLDsUBsdXahf5QgaHNTS"
          ref={recaptchaRef}
          size="invisible"
          className="absolute"
          onErrored={() => {
            console.error("reCAPTCHA failed to load");
            toast.error("reCAPTCHA failed to load. Please refresh the page.");
          }}
          onExpired={() => {
            console.warn("reCAPTCHA token expired");
            toast.error("reCAPTCHA expired. Please try again.");
          }}
        />
      </form>
    </div>
  );
};

interface HeaderSectionProps {
  careerPage?: boolean
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ careerPage }) => (
  <div className="text-white mb-12">
    <h2 className="2xl:text-[40px] text-xl font-normal leading-[133%] mb-[18px] tracking-wide">

      {careerPage ? (
        <>
          Interested in Working <br /> With Us?
        </>
      ) :
        (
          <>
            Reach Out to Us
          </>
        )
      }

    </h2>
    <p
      className="2xl:text-[20px] leading-[133%] 2xl:max-w-[430px] 2xl:mt-2 tracking-tight"
      style={{ color: STYLES.colors.textSecondary }}
    >
      {careerPage ? (
        <>
          Have a question about fuel sourcing, logistics, or anything in between? Our team is here to provide clarity, direction, and solutions tailored to your business.
        </>
      ) : (
        <>
          Have a question about fuel sourcing, logistics, or anything in between? Our team is here to provide clarity, direction, and solutions tailored to your business.
        </>
      )}

    </p>
  </div>
);

interface ContactUsProps {
  careerPage?: boolean
}

const ContactUs: React.FC<ContactUsProps> = ({ careerPage }) => {
  return (
    <div className="w-full">
      <div className="relative">
        <div
          className={`3xl:rounded-[40px] 2xl:rounded-[30px] rounded-[24px] ${STYLES.spacing.containerPadding.desktop} lg:h-full relative h-full overflow-hidden`}
          style={{ background: STYLES.colors.gradientBackground }}
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block h-full">
            <div className="grid lg:grid-cols-2 h-full">
              <div className="text-white flex flex-col h-full">
                <HeaderSection careerPage={careerPage} />
                <div className="mt-auto">
                  <ContactInfo layout="desktop" />
                </div>
              </div>
              <div className="flex items-center justify-center h-full">
                <ContactForm layout="desktop" careerPage={careerPage} />
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden sm:block lg:hidden">
            <div className="text-white mb-[30px]">
              <h2 className="2xl:text-[40px] md:text-[34px] 2xl:font-normal leading-[133%] mb-[6px] tracking-[0.5px] 2xl:tracking-tight">
                {careerPage ? (
                  <>
                    Interested in Working With Us?
                  </>
                ) :
                  (
                    <>
                      Reach Out to Us
                    </>
                  )
                }
              </h2>
              <p
                className="text-base 2xl:leading-[150%] md:leading-[140%] w-[375px] 2xl:text-[20px] font-normal"
                style={{ color: STYLES.colors.textSecondary }}
              >
                Have a question about fuel sourcing, logistics, or anything in between? Our team is here to provide clarity, direction, and solutions tailored to your business.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="text-white">
                <ContactInfo layout="tablet" />
              </div>
              <ContactForm layout="tablet" careerPage={careerPage} />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="text-white mb-[35px]">
              <h2 className="md:text-3xl xs:text-[34px] font-normal md:leading-tight xs:leading-[133%] mb-[15px]">
                {careerPage ? (
                  <>
                    Interested in Working <br /> With Us?
                  </>
                ) :
                  (
                    <>
                      Reach Out to Us
                    </>
                  )
                }
              </h2>
              <p
                className="text-[16px] font-normal leading-[140%]"
                style={{
                  color: STYLES.colors.textSecondary,
                  letterSpacing: "-1%",
                }}
              >
                Have a question about fuel sourcing, logistics, or anything in between? Our team is here to provide clarity, direction, and solutions tailored to your business.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <ContactInfo layout="mobile" />
              <ContactForm layout="mobile" careerPage={careerPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
