import tensorflow as tf

def check_tensorflow_gpu():
    """
    Checks if TensorFlow can detect and use the GPU.
    """
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        try:
            # Currently, a GPU is visible to TensorFlow
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
            logical_gpus = tf.config.list_logical_devices('GPU')
            print(f"TensorFlow has detected {len(gpus)} Physical GPUs and {len(logical_gpus)} Logical GPUs.")
            print("TensorFlow is configured to use GPU(s).")
            # You can add more detailed info if needed
            print(f"GPU Device Name: {gpus[0].name}")
        except RuntimeError as e:
            # Memory growth must be set before GPUs have been initialized
            print(e)
            print("TensorFlow detected GPUs but encountered an error during configuration.")
    else:
        print("TensorFlow did NOT detect any NVIDIA GPUs. It will run on CPU.")

if __name__ == "__main__":
    check_tensorflow_gpu()