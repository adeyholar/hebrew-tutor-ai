import torch

def check_pytorch_gpu():
    """
    Checks if PyTorch can detect and use the GPU.
    """
    if torch.cuda.is_available():
        print("PyTorch has detected an NVIDIA GPU!")
        print(f"CUDA Version detected by PyTorch: {torch.version.cuda}")
        print(f"Number of CUDA Devices: {torch.cuda.device_count()}")
        print(f"Current CUDA Device Name: {torch.cuda.get_device_name(0)}")
        print(f"Total Memory on Device 0: {torch.cuda.get_device_properties(0).total_memory / (1024**3):.2f} GB")
    else:
        print("PyTorch did NOT detect an NVIDIA GPU. It will run on CPU.")

if __name__ == "__main__":
    check_pytorch_gpu()